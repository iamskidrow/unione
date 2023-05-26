<script>
import Navbar from "@/components/Student/Navbar.vue";
import axios from "axios";

export default {
    name: "Course",
    components: {Navbar},
    data() {
        return {
            profile: {},
            course: [],
        };
    },
    methods: {
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
    created() {
        this.getUserInfo().then(userInfo => {
            const studentId = userInfo._id;
            axios
                .get(`http://localhost:3000/api/student/${studentId}`)
                .then(response => {
                    this.profile = response.data;
                    axios
                        .get(`http://localhost:3000/api/course/${this.profile.course_id}`)
                        .then(response => {
                            this.course = response.data;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                });
        });
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
                            Course
                        </div>
                        <h2 class="page-title">
                            Welcome, {{ profile.first_name }} 👋
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- Course Information -->
        <div class="page-wrapper">
            <div class="page-body">
                <div class="container-xl">
                    <div class="card card-lg">
                        <div class="card-body">
                            <div class="space-y-4">
                                <div v-if="course">
                                    <h2 class="mb-3">{{ course.name }}</h2>
                                    <p>
                                        {{ course.description }}
                                        <br><br>
                                        <b>School:</b> <i>{{ course.school }}</i>
                                        <br>
                                        <b>Department:</b> <i>{{ course.department }}</i>
                                        <br>
                                        <b>Total Semesters:</b> <i>{{ course.total_semesters }}</i>
                                    </p>
                                    <div :id="'faq-0'" class="accordion" role="tablist" aria-multiselectable="true">
                                        <div v-for="(semester, semesterIndex) in course.subjects" :key="semesterIndex"
                                             class="accordion-item">
                                            <div class="accordion-header" role="tab">
                                                <button class="accordion-button collapsed" data-bs-toggle="collapse"
                                                        :data-bs-target="'#faq-0-' + (semesterIndex + 2)">
                                                    Semester {{ semester.semester }}
                                                </button>
                                            </div>
                                            <div :id="'faq-0-' + (semesterIndex + 2)"
                                                 class="accordion-collapse collapse" role="tabpanel"
                                                 :data-bs-parent="'#faq-0'">
                                                <div class="accordion-body pt-0">
                                                    <div>
                                                        <ul>
                                                            <li v-for="subject in semester.subject_names">{{
                                                                subject
                                                                }}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>


