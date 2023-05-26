<script>
import axios from "axios";

export default {
    name: "Navbar",
    data() {
        return {
            logo: '/src/assets/static/logo.png',
            profile: {},
            profile_options: [
                {text: 'Profile', url: '/admin/profile'},
                {text: 'Settings', url: '/admin/settings'},
                {text: 'Logout', url: '/logout'}
            ],
            options: [
                {
                    text: 'Courses',
                    url: '/admin/courses',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"\n' +
                        '                           stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"\n' +
                        '                           stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path\n' +
                        '                          d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z"></path><path\n' +
                        '                          d="M19 16h-12a2 2 0 0 0 -2 2"></path><path d="M9 8h6"></path></svg>'
                },
                {
                    text: 'Teachers',
                    url: '/admin/teachers',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"\n' +
                        '                           stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"\n' +
                        '                           stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path\n' +
                        '                          d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path><path\n' +
                        '                          d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path><line x1="3" y1="6" x2="3" y2="19"></line><line\n' +
                        '                          x1="12" y1="6" x2="12" y2="19"></line><line x1="21" y1="6" x2="21" y2="19"></line></svg>'
                },
                {
                    text: 'Students',
                    url: '/admin/students',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"\n' +
                        '                           stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"\n' +
                        '                           stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path\n' +
                        '                          d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697"></path><path d="M18 14v4h4"></path><path\n' +
                        '                          d="M18 11v-4a2 2 0 0 0 -2 -2h-2"></path><rect x="8" y="3" width="6" height="4" rx="2"></rect><circle\n' +
                        '                          cx="18" cy="18" r="4"></circle><path d="M8 11h4"></path><path d="M8 15h3"></path></svg>'
                },
                {
                    text: 'Timetable',
                    url: '/admin/timetable',
                    icon: ' <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"\n' +
                        '                           stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"\n' +
                        '                           stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path\n' +
                        '                          d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"></path><circle\n' +
                        '                          cx="18" cy="18" r="4"></circle><path d="M15 3v4"></path><path d="M7 3v4"></path><path\n' +
                        '                          d="M3 11h16"></path><path d="M18 16.496v1.504l1 1"></path></svg>'
                },
                {
                    text: 'Noticeboard',
                    url: '/admin/noticeboard',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"\n' +
                        '                           stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"\n' +
                        '                           stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path\n' +
                        '                          d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8"></path><path\n' +
                        '                          d="M14 19l2 2l4 -4"></path><path d="M9 8h4"></path><path d="M9 12h2"></path></svg>'
                },
            ],
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

    <header class="navbar navbar-expand-md navbar-light d-print-none">
        <div class="container-xl">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Logo -->
            <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                <router-link to="/admin/">
                    <img :src="logo" alt="icon" class="navbar-brand-image">
                </router-link>
            </h1>

            <!-- Theme Toggle -->
            <div class="navbar-nav flex-row order-md-last">
                <div class="d-none d-md-flex">
                    <a href="?theme=dark" class="nav-link px-3 hide-theme-dark" title="Enable dark mode"
                       data-bs-toggle="tooltip"
                       data-bs-placement="bottom">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                             stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                             stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
                        </svg>
                    </a>
                    <a href="?theme=light" class="nav-link px-3 hide-theme-light" title="Enable light mode"
                       data-bs-toggle="tooltip" data-bs-placement="bottom">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                             stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                             stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="12" cy="12" r="4"/>
                            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"/>
                        </svg>
                    </a>
                </div>

                <!-- Profile -->
                <div class="nav-item dropdown">
                    <router-link to="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
                                 aria-label="Open user menu">
                        <span class="avatar avatar-sm"
                              :style="{ backgroundImage: 'url(' + profile.avatar_url + ')' }"></span>
                        <div class="d-none d-xl-block ps-2">
                            <div>{{ profile.first_name }}</div>
                            <div class="mt-1 small text-muted">Admin</div>
                        </div>
                    </router-link>
                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <router-link class="dropdown-item" v-for="(option, index) in profile_options" :key="index"
                                     :to="option.url">{{ option.text }}
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Sections -->
            <div class="collapse navbar-collapse" id="navbar-menu">
                <div class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                    <ul class="navbar-nav">
                        <li v-for="(option, index) in options" :key="index" class="nav-item" id="active-nav-item">
                            <!--inject the class "active" to show active underlines-->
                            <router-link class="nav-link" :to="option.url">
                                <span class="nav-link-icon d-md-none d-lg-inline-block" v-html="option.icon"></span>
                                <span class="nav-link-title">{{ option.text }}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </header>

</template>
