<script>

import Navbar from "@/components/Student/Navbar.vue";
import axios from "axios";

export default {
    name: "Timetable",
    components: {Navbar},
    data() {
        return {
            profile: {},
            timetable: {},
            times: [
                '09:30 - 10:30',
                '10:30 - 11:30',
                '11:30 - 12:30',
                'Interval',
                '01:30 - 02:30',
                '02:30 - 03:30',
                '03:30 - 04:30',
                '04:30 - 05:30'
            ],
        }
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
                        .get(`http://localhost:3000/api/timetable/${this.profile.course_id}/${this.profile.current_semester}`)
                        .then(response => {
                            this.timetable = response.data;
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
}
</script>

<template>

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

</template>

