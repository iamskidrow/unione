<template>
    <div class="page page-center">
        <div class="container-tight py-4">
            <div class="empty">
                <div class="empty-header">403</div>
                <p class="empty-title">Oops… You just found an error page</p>
                <p class="empty-subtitle text-muted">
                    You are not authorized to view this content
                </p>
                <div class="empty-action">
                    <router-link to="/" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                             stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                             stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 12l14 0"/>
                            <path d="M5 12l6 6"/>
                            <path d="M5 12l6 -6"/>
                        </svg>
                        Back to Homepage
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AccessDenied"
}
</script>

<style scoped>

</style>