<template>
    <div>
        Logging out...
    </div>
</template>

<script>
async function logout() {
    try {
        const response = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            // Redirect the user to the login page
            window.location.replace('/login');
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error(error);
    }
}

export default {
    mounted() {
        // Automatically execute the logout function when the component is mounted
        logout();
    }
}
</script>
