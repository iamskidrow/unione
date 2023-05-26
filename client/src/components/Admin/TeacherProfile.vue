<script>
import axios from 'axios'
import Navbar from "@/components/Admin/Navbar.vue";

export default {
    name: 'TeacherProfile',
    components: {Navbar},
    data() {
        return {
            teacherInfo: {
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
    mounted() {
        const teacherId = this.$route.params.id;
        axios.get(`http://localhost:3000/api/teacher/${teacherId}`)
            .then(response => {
                this.teacherInfo = response.data;
            })
            .catch(error => {
                console.log(error);
            });
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
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };
            return date.toLocaleDateString('en-IN', options);
        },
    },
}
</script>

<template>
    <div>
        <Navbar></Navbar>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <div class="page-pretitle">
                                Teacher's Profile
                            </div>
                            <h2 class="page-title">
                                👉 {{ teacherInfo.first_name }} {{ teacherInfo.last_name }}
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
                        {{ teacherInfo.profile_status }}
                      </span>
                                    </div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Avatar</div>
                                    <div class="datagrid-content">
                                        <div class="d-flex align-items-center">
                    <span class="avatar avatar-xs me-2 rounded"
                          :style="{ backgroundImage: `url(${teacherInfo.avatar_url})` }"></span>
                                            {{ teacherInfo.first_name }}
                                        </div>
                                    </div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Name</div>
                                    <div class="datagrid-content">
                                        {{ teacherInfo.first_name + ' ' + teacherInfo.last_name }}
                                    </div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Gender</div>
                                    <div class="datagrid-content">{{ teacherInfo.gender }}</div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Date of Birth</div>
                                    <div class="datagrid-content">{{ formatDate(teacherInfo.date_of_birth) }}</div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Department</div>
                                    <div class="datagrid-content">{{ teacherInfo.department }}
                                    </div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">School</div>
                                    <div class="datagrid-content">{{ teacherInfo.school }}
                                    </div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Subjects</div>
                                    <div class="datagrid-content">{{ teacherInfo.subjects }}
                                    </div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Designation</div>
                                    <div class="datagrid-content">{{ teacherInfo.designation }}
                                    </div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Employee Number</div>
                                    <div class="datagrid-content">{{ teacherInfo.employee_number }}</div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Registration Number</div>
                                    <div class="datagrid-content">{{ teacherInfo.registration_number }}</div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Phone</div>
                                    <div class="datagrid-content">{{ teacherInfo.phone }}</div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Personal E-Mail</div>
                                    <div class="datagrid-content">{{ teacherInfo.email }}</div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">University E-Mail</div>
                                    <div class="datagrid-content">{{ teacherInfo.university_email }}</div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Address</div>
                                    <div class="datagrid-content">
                                        {{ teacherInfo.address.street }}, {{ teacherInfo.address.city }}, {{
                                        teacherInfo.address.state
                                        }}, {{ teacherInfo.address.zip }}, {{ teacherInfo.address.country }}
                                    </div>
                                </div>
                                <div class="datagrid-item">
                                    <div class="datagrid-title">Joining Date</div>
                                    <div class="datagrid-content">{{ formatDate(teacherInfo.joining_date) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
