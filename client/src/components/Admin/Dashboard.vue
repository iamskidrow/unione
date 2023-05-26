<script>
import Navbar from "@/components/Admin/Navbar.vue";
import axios from "axios";

export default {
    name: "Dashboard.vue",
    components: {Navbar},
    data() {
        return {
            profile: {},
        }
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
    }
}
</script>

<template>
    <Navbar></Navbar>

    <div className="page-wrapper">
        <!-- Page header -->
        <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <div className="page-pretitle">
                            Dashboard
                        </div>
                        <h2 className="page-title">
                            Welcome, {{ profile.name }} 👋
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
                                <div class="datagrid-title">Phone</div>
                                <div class="datagrid-content">{{ profile.phone }}</div>
                            </div>
                            <div class="datagrid-item">
                                <div class="datagrid-title">Personal E-Mail</div>
                                <div class="datagrid-content">{{ profile.email }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


