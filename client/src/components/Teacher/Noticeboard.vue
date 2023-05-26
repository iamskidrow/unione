<script>
import Navbar from "@/components/Teacher/Navbar.vue";
import axios from "axios";

export default {
    name: "Noticeboard",
    components: {Navbar},
    data() {
        return {
            formattedDate: '',
            profile: {},
            notices: [],
            title: '',
            publisher: '',
            date: '',
            notice: '',
        }
    },
    mounted() {
        this.getNotices();
        // this.deleteNotice();
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        this.formattedDate = `${dd}/${mm}/${yyyy}`;
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
        async addNotice() {
            try {
                const response = await axios.post('http://localhost:3000/api/noticeboard/', {
                    title: this.title,
                    publisher: this.profile.first_name,
                    date: this.formattedDate,
                    notice: this.notice,
                });
                window.location.reload();
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async getNotices() {
            try {
                const response = await axios.get('http://localhost:3000/api/noticeboard/');
                this.notices = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteNotice(id) {
            try {
                await axios.delete(`http://localhost:3000/api/noticeboard/${id}`);
                window.location.reload();
                this.posts = this.posts.filter((post) => post._id !== id);
            } catch (error) {
                console.log(error);
            }
        },
        editPost(post) {
            // Implement edit functionality
        },
    },
    computed: {
        isDisabled() {
            return !(this.title && this.profile.first_name && this.formattedDate && this.notice);
        }
    },
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
                        <!-- Page pre-title -->
                        <div class="page-pretitle">
                            Noticeboard
                        </div>
                        <h2 class="page-title">
                            Welcome, {{ profile.first_name }} 👋
                        </h2>
                    </div>
                    <!-- Page title actions -->
                    <div class="col-12 col-md-auto ms-auto d-print-none">
                        <div class="btn-list">
                            <a href="#" class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal"
                               data-bs-target="#modal-team">
                                Add Notice
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Page body -->
        <div class="page-wrapper page-body container-xl">
            <div class="card">
                <div class="table-responsive">
                    <table
                            class="table table-vcenter card-table table-striped">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Publisher</th>
                            <th>Date</th>
                            <th>Message</th>
                            <th>Action</th>
                            <th class="w-1"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="notice in notices" :key="notice._id">
                            <td>{{ notice.title }}</td>
                            <td class="text-muted">{{ notice.publisher }}</td>
                            <td>
                                {{ notice.date }}
                            </td>
                            <td class="text-muted">
                                {{ notice.notice }}
                            </td>
                            <td>
                                <a href="#">Edit</a>
                            </td>
                            <td>
                                <a href="#" @click.prevent="deleteNotice(notice._id)">Delete</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal modal-blur fade" id="modal-team" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add new Notice</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3 align-items-end">

                            <div class="col">
                                <label class="form-label">Title</label>
                                <input type="text" class="form-control" v-model="title" id="title"/>
                            </div>
                        </div>
                        <div class="row mb-3 align-items-end">

                            <div class="col">
                                <label class="form-label">Publisher</label>
                                <input disabled type="text" class="form-control" v-model="publisher" id="publisher"
                                       :placeholder="profile.first_name"/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Date</label>
                            <input disabled type="date" class="form-control" v-model="date" id="date">
                        </div>
                        <div>
                            <label class="form-label">Notice</label>
                            <textarea class="form-control" v-model="notice" id="notice"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"
                                @click.prevent="addNotice" :disabled="isDisabled">Add Notice
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>


