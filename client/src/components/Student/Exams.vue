<script>
import Navbar from "@/components/Student/Navbar.vue";
import axios from "axios";

export default {
    name: "Exams",
    components: {Navbar},
    data() {
        return {
            profile: {},
            exams: [],
            courses: [],
            semesters: [],
        }
    },
    async created() {
        const userInfo = await this.getUserInfo();
        const studentId = userInfo._id;
        axios.get(`http://localhost:3000/api/student/${studentId}`)
            .then(response => {
                this.profile = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    mounted() {
        // this.fetchCourses();
        this.fetchExams();
    },
    methods: {
        // Format date
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };
            return date.toLocaleDateString('en-IN', options);
        },
        // Get user info
        async getUserInfo() {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:3000/api/check_token', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true // This is required for sending cookies in cross-site requests
                });
                return response.data;
            } catch (error) {
                // console.error(error);
                return {};
            }
        },
        fetchExams() {
            const course_id = this.profile.course_id;
            const semester = this.profile.current_semester;

            axios
                .get(`http://localhost:3000/api/exams`, {
                    params: {
                        course_id: course_id,
                        semester: semester
                    }
                })
                .then((response) => {
                    this.exams = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

    }
}
</script>

<template>

    <Navbar></Navbar>

    <div className="page-wrapper">
        <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <div className="page-pretitle">
                            Exams
                        </div>
                        <h2 className="page-title">
                            Welcome, {{ profile.first_name }} 👋
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div className="page-body">
            <div className="container-xl">
                <div className="col-12">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-vcenter table-mobile-md card-table">
                                <thead>
                                <tr>
                                    <th>About</th>
                                    <th>Marks</th>
                                    <th>Time</th>
                                    <th className="w-1">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="exam in exams" :key="exam._id">
                                    <td data-label="Name">
                                        <div className="d-flex py-1 align-items-center">
                                            <div className="flex-fill">
                                                <div className="font-weight-medium">{{ exam.exam_name }}</div>
                                                <div className="text-muted">{{ exam.subject }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-label="Title">
                                        <div>Total Marks</div>
                                        <div className="text-muted">{{ exam.marks }}</div>
                                    </td>
                                    <td data-label="Role">
                                        <div>{{ exam.date }}</div>
                                        <div className="text-muted">{{ exam.start_time }} - {{ exam.end_time }}</div>
                                    </td>
                                    <td>
                                        <div className="btn-list flex-nowrap">
                                            <router-link :to="'/student/exam/' + exam._id"
                                                         className="btn btn-outline-primary">
                                                View
                                            </router-link>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

