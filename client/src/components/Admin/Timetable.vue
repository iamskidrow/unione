<script>
import Navbar from "@/components/Admin/Navbar.vue";
import axios from "axios";

export default {
    name: "Timetable",
    components: {Navbar},
    data() {
        return {
            profile: {},
            timetable: {},
            times: [
                "09:30 - 10:30",
                "10:30 - 11:30",
                "11:30 - 12:30",
                "Interval",
                "01:30 - 02:30",
                "02:30 - 03:30",
                "03:30 - 04:30",
                "04:30 - 05:30",
            ],
            courses: [],
            semesters: [],
            selectedCourse: "",
            selectedSemester: "",
        };
    },
    async created() {
        const userInfo = await this.getUserInfo();
        const adminId = userInfo._id;

        axios.get(`http://localhost:3000/api/admin/${adminId}`)
            .then(response => {
                this.profile = response.data;
            })
            .catch(error => {
                console.log(error);
            });

        this.fetchCourses();
    },
    methods: {
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
        fetchCourses() {
            axios
                .get("http://localhost:3000/api/courses")
                .then((response) => {
                    this.courses = response.data;
                    this.selectedCourse = this.courses[0]._id;
                    this.fetchSemesters();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        fetchSemesters() {
            axios
                .get(`http://localhost:3000/api/course/${this.selectedCourse}`)
                .then((response) => {
                    const totalSemesters = response.data.total_semesters;
                    this.semesters = Array.from({length: totalSemesters}, (_, i) => i + 1);
                    this.selectedSemester = this.semesters[0];
                    this.fetchTimetable();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        fetchTimetable() {
            axios
                .get(`http://localhost:3000/api/timetable/${this.selectedCourse}/${this.selectedSemester}`)
                .then((response) => {
                    this.timetable = response.data;
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        // No timetable data available, set timetable to an empty object
                        this.timetable = {
                            day: {
                                Monday: ["", "", "", "", "", "", "", ""],
                                Tuesday: ["", "", "", "", "", "", "", ""],
                                Wednesday: ["", "", "", "", "", "", "", ""],
                                Thursday: ["", "", "", "", "", "", "", ""],
                                Friday: ["", "", "", "", "", "", "", ""],
                            }
                        };
                    } else {
                        console.error(error);
                    }
                });
        }
    },
};
</script>


<template>
    <div>
        <Navbar></Navbar>
        <div class="page-wrapper">

            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <div class="page-pretitle">
                                Timetable
                            </div>
                            <h2 class="page-title">
                                Welcome, {{ profile.first_name }} 👋
                            </h2>
                        </div>

                        <!-- Page title actions -->
                        <div class="col-12 col-auto col-md-auto ms-auto d-print-none">
                            <div class="row g-2">
                                <div class="col-7">
                                    <select class="form-select" v-model="selectedCourse" @change="fetchSemesters">
                                        <option v-for="course in courses" :value="course._id">{{ course.name }}</option>
                                    </select>
                                </div>
                                <div class="col-5">
                                    <select class="form-select" v-model="selectedSemester"
                                            :disabled="semesters.length === 0"
                                            @change="fetchTimetable">
                                        <option v-for="semester in semesters" :value="semester">{{ semester }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page-body">
                <div class="container-xl">
                    <div class="card">
                        <div class="card-body">
                            <div id="table-default" class="table-responsive">

                                <table class="table table-responsive table-bordered table-center">
                                    <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th v-for="(time, index) in times" :key="index">{{ time }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(classes, day) in timetable.day" :key="day">
                                        <th>{{ day }}</th>
                                        <td v-if="timetable.status !== 404">{{ classes[0] }}</td>
                                        <td v-if="timetable.status !== 404">{{ classes[1] }}</td>
                                        <td v-if="timetable.status !== 404">{{ classes[2] }}</td>
                                        <td v-if="timetable.status !== 404">{{ classes[3] }}</td>
                                        <td v-if="timetable.status !== 404">{{ classes[4] }}</td>
                                        <td v-if="timetable.status !== 404">{{ classes[5] }}</td>
                                        <td v-if="timetable.status !== 404">{{ classes[6] }}</td>
                                        <td v-if="timetable.status !== 404">{{ classes[7] }}</td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

