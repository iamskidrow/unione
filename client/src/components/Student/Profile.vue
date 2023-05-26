<script>
import Navbar from "@/components/Student/Navbar.vue";
import axios from "axios";

export default {
    name: "Profile.vue",
    components: {Navbar},
    data() {
        return {
            profile: {
                address: {
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: ''
                }
            },
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
        <!-- Page header -->
        <div class="page-header d-print-none">
            <div class="container-xl">
                <div class="row g-2 align-items-center">
                    <div class="col">
                        <div class="page-pretitle">
                            Profile
                        </div>
                        <h2 class="page-title">
                            Welcome, {{ profile.first_name }} 👋
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <!-- Page body -->
        <div class="page-body">
            <div class="container-xl">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Basic info</h3>
                    </div>
                    <div class="card-body">
                        <div class="datagrid">
                            <div class="datagrid-item">
                                <div class="datagrid-title">Status</div>
                                <div class="datagrid-content">
                      <span class="status status-green">
                        {{ profile.profile_status }}
                      </span>
                                </div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Avatar</div>
                                <div class="datagrid-content">
                                    <div class="d-flex align-items-center">
                    <span class="avatar avatar-xs me-2 rounded"
                          :style="{ backgroundImage: `url(${profile.avatar_url})` }"></span>
                                        {{ profile.first_name }}
                                    </div>
                                </div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Name</div>
                                <div class="datagrid-content">{{ profile.first_name + ' ' + profile.last_name }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Gender</div>
                                <div class="datagrid-content">{{ profile.gender }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Date of Birth</div>
                                <div class="datagrid-content">{{ formatDate(profile.date_of_birth) }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Department</div>
                                <div class="datagrid-content">{{ profile.department }}
                                </div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">School</div>
                                <div class="datagrid-content">{{ profile.school }}
                                </div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Course</div>
                                <div class="datagrid-content">{{ profile.course }}, Semester {{
                                    profile.current_semester
                                    }}
                                </div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Roll Number</div>
                                <div class="datagrid-content">{{ profile.roll_number }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Registration Number</div>
                                <div class="datagrid-content">{{ profile.registration_number }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Phone</div>
                                <div class="datagrid-content">{{ profile.phone }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Personal E-Mail</div>
                                <div class="datagrid-content">{{ profile.email }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">University E-Mail</div>
                                <div class="datagrid-content">{{ profile.university_email }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Address</div>
                                <div class="datagrid-content">
                                    {{ profile.address.street }}, {{ profile.address.city }}, {{
                                    profile.address.state
                                    }}, {{ profile.address.zip }}, {{ profile.address.country }}
                                </div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Session</div>
                                <div class="datagrid-content">{{ profile.session }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Date of Admission</div>
                                <div class="datagrid-content">{{ formatDate(profile.admission_date) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


