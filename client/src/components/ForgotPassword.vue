<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      logo: '/src/assets/static/logo.png',
    }
  }
}
</script>

<template>

  <div className="page page-center">
    <div className="container container-tight py-4">
      <div className="text-center mb-4">
        <a href="#" className="navbar-brand navbar-brand-autodark">
          <img :src="logo" height="36" alt="">
        </a>
      </div>
      <form className="card card-md" action="" method="get" autoComplete="off" noValidate>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Forgot password</h2>
          <p className="text-muted mb-4">Enter your email address and your password will be reset and emailed to
            you.</p>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder="Enter email">
          </div>
          <div className="form-footer">
            <a href="#" className="btn btn-primary w-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24"
                   stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <polyline points="3 7 12 13 21 7"/>
              </svg>
              Send me new password </a>
          </div>
        </div>
      </form>
      <div className="text-center text-muted mt-3"> Remember the password?
        <router-link to="/login">Sign In</router-link>
      </div>
    </div>
  </div>

</template>
