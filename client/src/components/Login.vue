<script>
import axios from "axios";

export default {
    name: "Login",
    data() {
        return {

            role: null,
            email: '',
            password: '',
            inputType: 'password',
            isFormEnabled: false,
            selectedRole: null,
            login_with: [
                {
                    name: 'Google',
                    url: '',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon text-google" viewBox="0 0 48 48" width="24" height="24"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>'
                },
                {
                    name: 'Twitter',
                    url: '',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon text-twitter" viewBox="0 0 48 48" width="24" height="24"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"/></svg>'
                },
            ],
        }
    },
    computed: {
        loginUrl() {
            if (this.role === 'admin') {
                return 'http://localhost:3000/api/login/admin';
            } else if (this.role === 'teacher') {
                return 'http://localhost:3000/api/login/teacher';
            } else if (this.role === 'student') {
                return 'http://localhost:3000/api/login/student';
            } else {
                return '';
            }
        },
    },
    methods: {
        // Show password toggle
        toggleInputType() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password';
        },

        onRoleChange() {
            this.isFormEnabled = this.role !== "";
        },

        // Login Handler
        async login() {
            try {
                await axios.post(this.loginUrl, {
                    email: this.email,
                    password: this.password,
                }, {
                    withCredentials: true
                });
                console.log('Login Successful');

                // Redirect user to appropriate page based on role
                if (this.role === 'admin') {
                    this.$router.push('/admin');
                } else if (this.role === 'teacher') {
                    this.$router.push('/teacher');
                } else if (this.role === 'student') {
                    this.$router.push('/student');
                }

            } catch (error) {
                console.log(error);
                alert("Incorrect Email or Password")
            }
        },

    },
}
</script>

<template>
    <div class="page page-center">
        <div class="container container-normal py-4">
            <div class="row align-items-center g-4">
                <div class="col-lg">
                    <div class="container-tight">
                        <div class="text-center mb-4">
                            <a href="#" class="navbar-brand navbar-brand-autodark">
                                <img src="/src/assets/static/logo.png" height="36" alt=""/>
                            </a>
                        </div>
                        <div class="card card-md">
                            <div class="card-body">
                                <h2 class="h2 text-center mb-4">Login to your account</h2>
                                <form action="" method="get" autocomplete="off" novalidate>
                                    <div class="mb-3">
                                        <div class="form-label">Choose Role</div>
                                        <select class="form-select" v-model="role" @change="onRoleChange">
                                            <option value="admin">Admin</option>
                                            <option value="teacher">Teacher</option>
                                            <option value="student">Student</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Email address</label>
                                        <input type="email" v-model="email" class="form-control" id="email"
                                               placeholder="your@email.com"
                                               autocomplete="off" :disabled="!isFormEnabled"/>
                                    </div>
                                    <div class="mb-2">
                                        <label class="form-label"> Password <span class="form-label-description">
          <router-link to="/forgot-password">I forgot password</router-link>
        </span>
                                        </label>
                                        <div class="input-group input-group-flat">
                                            <input v-model="password" v-bind:type="inputType" type="password"
                                                   class="form-control"
                                                   id="password"
                                                   placeholder="Your password" autocomplete="off"
                                                   :disabled="!isFormEnabled"/>
                                            <span class="input-group-text">
          <a href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip"
             @click="toggleInputType">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                 viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                 stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="12" cy="12" r="2"/>
              <path
                      d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"/>
            </svg>
          </a>
        </span>
                                        </div>
                                    </div>
                                    <div class="mb-2">
                                        <label class="form-check">
                                            <input type="checkbox" class="form-check-input"/>
                                            <span class="form-check-label">Remember me on this device</span>
                                        </label>
                                    </div>
                                    <div class="form-footer">
                                        <button :disabled="!isFormEnabled || !email || !password" @click.prevent="login"
                                                type="submit" class="btn btn-primary w-100"> Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <!-- Login With -->
                            <div class="hr-text">Or Login With</div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col" v-for="login in login_with">
                                        <a href="#" class="btn w-100">
                                            <div v-html="login.icon"></div>
                                            {{ login.name }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--                        <div class="text-center text-muted mt-3"> Don't have account yet?-->
                        <!--                            <router-link to="#" tabindex="-1">Sign-->
                        <!--                                up-->
                        <!--                            </router-link>-->
                        <!--                        </div>-->
                    </div>
                </div>
                <div class="col-lg d-none d-lg-block">
                    <img src="/src/assets/static/logo_new.png" height="300" class="d-block mx-auto" alt=""/>
                </div>
            </div>
        </div>
    </div>
</template>
