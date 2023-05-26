<script>
import Navbar from "@/components/Student/Navbar.vue";
import axios from "axios";

export default {
    name: "Noticeboard",
    components: {Navbar},
    data() {
        return {
            profile: {},
            notices: [],
        }
    },
    mounted() {
        this.getNotices();
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
        async getNotices() {
            try {
                const response = await axios.get('http://localhost:3000/api/noticeboard/');
                this.notices = response.data;
            } catch (error) {
                console.log(error);
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
                            Noticeboard
                        </div>
                        <h2 class="page-title">
                            Welcome, {{ profile.first_name }} 👋
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- Notice Information -->
        <div class="page-wrapper">
            <div class="page-body">
                <div class="container-xl">
                    <div class="card">
                        <div class="accordion" id="accordion-example">
                            <div class="accordion-item" v-for="(notice, index) in notices" :key="index">
                                <h2 class="accordion-header" :id="'heading-'+Number(index+1)">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                            :data-bs-target="'#collapse-'+Number(index+1)" aria-expanded="false">
                                        {{ notice.title }}
                                    </button>
                                </h2>
                                <div :id="'collapse-'+Number(index+1)" class="accordion-collapse collapse"
                                     data-bs-parent="#accordion-example">
                                    <div class="accordion-body pt-0"><strong>{{ notice.publisher }}</strong>, <em> {{
                                        notice.date
                                        }}</em> <br><br>
                                        {{ notice.notice }}
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


