<template>
    <div class="page page-center">
        <div class="container container-tight py-4">
            <div class="text-center mb-4">
                <a href="." class="navbar-brand navbar-brand-autodark"><img src="/src/assets/static/logo.png" height="56" alt=""></a>
            </div>
            <div class="text-center">
                <div class="my-5">
                    <h2 class="h1">Redirecting...</h2>
                    <p class="fs-h3 text-muted">
                        Please wait while we are redirecting you...<br/>
                    </p>
                </div>
                <div class="text-center text-muted mt-3">
                    <div class="progress progress-sm">
                        <div class="progress-bar progress-bar-indeterminate"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

async function getUserInfo() {
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

export default {
    name: 'App',
    async created() {
        try {
            // Get user info
            const {role} = await getUserInfo();

            // Redirect to the appropriate route based on the user's role
            if (role === 'admin') {
                this.$router.push('/admin');
            } else if (role === 'teacher') {
                this.$router.push('/teacher');
            } else if (role === 'student') {
                this.$router.push('/student');
            } else {
                this.$router.push('/login');
            }
        } catch (error) {
            console.error(error);
            this.$router.push('/login');
        }
    }
}
</script>