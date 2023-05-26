<script>
import Navbar from "@/components/Student/Navbar.vue";
import axios from "axios";

export default {
  name: "Settings.vue",
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
      old_password: '',
      new_password: '',
      confirm_new_password: ''
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
    },
    async changePassword() {
      const userInfo = await this.getUserInfo();
      const studentId = userInfo._id;

      const data = {
        student_id: studentId,
        old_password: this.old_password,
        new_password: this.new_password,
        confirm_new_password: this.confirm_new_password
      };

      axios.post('http://localhost:3000/api/student/change-password', data)
          .then(response => {
            console.log(response.data);
            this.$router.push('/');
          })
          .catch(error => {
            console.error(error.response.data);
          });
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
              Settings
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
        <div class="row row-cards">
          <div class="col-lg-8">
            <div class="card card-lg">
              <div class="card-body">
                <div class="markdown">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                    Suspendisse lectus tortor,
                    dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum
                    ultrices diam. Maecenas ligula
                    massa, varius a, semper congue, euismod non, mi.</p>
                  <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum
                    diam nisl sit amet erat.
                    Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
                    Pellentesque congue.
                    Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.</p>
                  <h3>Random Text 01</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                    Suspendisse lectus tortor,
                    dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum
                    ultrices diam. Maecenas ligula
                    massa, varius a, semper congue, euismod non, mi.</p>
                  <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum
                    diam nisl sit amet erat.
                    Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
                    Pellentesque congue.
                    Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                    Suspendisse lectus tortor,
                    dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum
                    ultrices diam. Maecenas ligula
                    massa, varius a, semper congue, euismod non, mi.</p>
                  <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum
                    diam nisl sit amet erat.
                    Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
                    Pellentesque congue.
                    Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.</p>
                  <h3>Random Text 02</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
                    Suspendisse lectus tortor,
                    dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum
                    ultrices diam. Maecenas ligula
                    massa, varius a, semper congue, euismod non, mi.</p>
                  <p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum
                    diam nisl sit amet erat.
                    Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
                    Pellentesque congue.
                    Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue.</p>
                  <ol>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Sed non risus.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <div class="">

                  </div>
                  <div><strong>Change Password</strong></div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Old Password</label>
                  <input type="password" class="form-control" v-model="old_password" placeholder="Enter Old Password">
                </div>
                <div class="mb-3">
                  <label class="form-label">New Password</label>
                  <input type="password" class="form-control" v-model="new_password" placeholder="Enter New Password">
                </div>
                <div class="mb-3">
                  <label class="form-label">Confirm New Password</label>
                  <input type="password" class="form-control" v-model="confirm_new_password"
                         placeholder="Confirm New Password">
                </div>
                <button type="submit" class="btn btn-outline-primary" data-bs-dismiss="modal"
                        @click.prevent="changePassword">Change Password
                </button>
              </div>
              <div class="card-footer">
                <em>Change your passwords often to keep your accounts safe and secure.</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>