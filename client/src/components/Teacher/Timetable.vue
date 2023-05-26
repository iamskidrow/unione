<script>

import Navbar from "@/components/Teacher/Navbar.vue";
import axios from "axios";

export default {
    name: "Timetable",
    components: {Navbar},
    data() {
        return {
            profile: {},
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
            data: [
                {
                    day: 'Monday',
                    first: '1st Class',
                    second: '2nd Class',
                    third: '3rd Class',
                    interval: '',
                    fourth: '4th Class',
                    fifth: '5th Class',
                    sixth: '6th Class',
                    seventh: '7th Class'
                },
                {
                    day: 'Tuesday',
                    first: '1st Class',
                    second: '2nd Class',
                    third: '3rd Class',
                    interval: '',
                    fourth: '4th Class',
                    fifth: '5th Class',
                    sixth: '6th Class',
                    seventh: '7th Class'
                },
                {
                    day: 'Wednesday',
                    first: '1st Class',
                    second: '2nd Class',
                    third: '3rd Class',
                    interval: '',
                    fourth: '4th Class',
                    fifth: '5th Class',
                    sixth: '6th Class',
                    seventh: '7th Class'
                },
                {
                    day: 'Thursday',
                    first: '1st Class',
                    second: '2nd Class',
                    third: '3rd Class',
                    interval: '',
                    fourth: '4th Class',
                    fifth: '5th Class',
                    sixth: '6th Class',
                    seventh: '7th Class'
                },
                {
                    day: 'Friday',
                    first: '1st Class',
                    second: '2nd Class',
                    third: '3rd Class',
                    interval: '',
                    fourth: '4th Class',
                    fifth: '5th Class',
                    sixth: '6th Class',
                    seventh: '7th Class'
                }
            ]
        }
    },
    async created() {
        const userInfo = await this.getUserInfo();
        const teacherId = userInfo._id;

        axios.get(`http://localhost:3000/api/teacher/${teacherId}`)
            .then(response => {
                this.profile = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
            return date.toLocaleDateString('en-IN', options);
        },
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
        }
    }
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
                                <tr v-for="(info, index) in data" :key="index">
                                    <th>{{ info.day }}</th>
                                    <td>{{ info.first }}</td>
                                    <td>{{ info.second }}</td>
                                    <td>{{ info.third }}</td>
                                    <td>{{ info.interval }}</td>
                                    <td>{{ info.fourth }}</td>
                                    <td>{{ info.fifth }}</td>
                                    <td>{{ info.sixth }}</td>
                                    <td>{{ info.seventh }}</td>
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

