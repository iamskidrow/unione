<script>
import Navbar from "@/components/Student/Navbar.vue";
import axios from "axios";

export default {
    name: "Homeworks",
    components: {Navbar},
    data() {
        return {
            profile: {},
            fields: [
                "Assigned On",
                "Subject",
                "Title",
                "Last Submission",
                "Status",
                "Action",
            ],
            homeworks: [],
        };
    },
    async created() {
        try {
            const userInfo = await this.getUserInfo();
            const studentId = userInfo._id;

            axios
                .get(`http://localhost:3000/api/student/${studentId}`)
                .then((response) => {
                    this.profile = response.data;
                    const currentSemester = this.profile.current_semester;
                    const courseId = this.profile.course_id;

                    // Fetch homeworks for the current semester and course
                    axios
                        .get(`http://localhost:3000/api/homeworks?semester=${currentSemester}&course_id=${courseId}`)
                        .then(async (response) => {
                            this.homeworks = await Promise.all(
                                response.data.map(async (homework) => {
                                    const {_id: homeworkId} = homework;
                                    const statusResponse = await axios.get(
                                        `http://localhost:3000/api/homework/answers?homework_id=${homeworkId}&student_id=${studentId}`
                                    );
                                    const {status, answer} = statusResponse.data;
                                    return {...homework, status, answer};
                                })
                            );
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        // Get user info
        async getUserInfo() {
            try {
                const token = localStorage.getItem("jwt");
                const response = await axios.get("http://localhost:3000/api/check_token", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true, // This is required for sending cookies in cross-site requests
                });
                return response.data;
            } catch (error) {
                // console.error(error);
                return {};
            }
        },
    },
};
</script>

<template>
    <Navbar></Navbar>
    <div class="page-wrapper">
        <div class="page-header d-print-none">
            <div class="container-xl">
                <div class="row g-2 align-items-center">
                    <div class="col">
                        <div class="page-pretitle">
                            Homeworks
                        </div>
                        <h2 class="page-title">
                            Welcome, {{ profile.first_name }} 👋
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-xl">
                <div class="card">
                    <div id="table-default" class="table-responsive">
                        <table class="table table-center table-vcenter">
                            <thead>
                            <tr>
                                <th v-for="(field, index) in fields" :key="index">{{ field }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(homework, index) in homeworks" :key="index">
                                <td>{{ homework.from_date }}</td>
                                <td class="text-muted">{{ homework.subject }}</td>
                                <td class="text-muted">{{ homework.title }}</td>
                                <td>{{ homework.to_date }}</td>
                                <td>
                                    <span v-if="homework.status === 'Submitted'">Submitted</span>
                                    <span v-else>Pending</span>
                                </td>
                                <td>
                                    <router-link :to="'/student/homework/' + homework._id">View</router-link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

