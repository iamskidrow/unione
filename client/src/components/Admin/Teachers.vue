<script>
import Navbar from "@/components/Admin/Navbar.vue";
import axios from "axios";

export default {
    name: "Teachers",
    components: {
        Navbar
    },
    data() {
        return {
            teacher: {},

            states: [],
            cities: [],
            selected_state: '',
            selected_city: '',

            schools: [],
            selected_school: null,
            departments: [],
            selected_department: null,

            profile_status: '',
            avatar_url: '',
            first_name: '',
            last_name: '',
            date_of_birth: '',
            gender: '',
            country: '',
            state: '',
            city: '',
            zip: '',
            street: '',
            phone: '',
            email: '',
            password: '',
            school: '',
            department: '',
            designation: '',
            employee_number: '',
            registration_number: '',
            subjects: '',
            university_email: '',
            joining_date: '',
        }
    },
    mounted() {
        axios.get('/src/assets/static/states+cities.json')
            .then(response => {
                this.states = Object.keys(response.data);
                this.states.sort();
            })
            .catch(error => {
                console.log(error);
            });
        this.get_schools();
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

        axios.get('http://localhost:3000/api/teachers')
            .then(response => {
                this.teacher = response.data;
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
        // Format date
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };
            return date.toLocaleDateString('en-IN', options);
        },
        // Show password toggle
        toggleInputType() {
            this.inputType = this.inputType === 'password' ? 'text' : 'password';
        },
        // Fetch states and cities from JSON file
        get_cities() {
            axios.get('/src/assets/static/states+cities.json')
                .then(response => {
                    this.cities = response.data[this.selected_state];
                    this.cities.sort();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        get_schools() {
            axios.get('/src/assets/static/school+department.json')
                .then(response => {
                    this.schools = Object.keys(response.data);
                    this.departments = Object.entries(response.data).flatMap(([school, departments]) => departments.map(department => ({
                        school,
                        department
                    })));
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // Login Handler
        async register() {
            try {
                const response = await axios.post('http://localhost:3000/api/teacher/', {
                    profile_status: this.profile_status,
                    avatar_url: this.avatar_url,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    date_of_birth: this.date_of_birth,
                    gender: this.gender,
                    address: {
                        country: this.country,
                        state: this.selected_state,
                        city: this.selected_city,
                        zip: this.zip,
                        street: this.street,
                    },
                    phone: this.phone,
                    email: this.email,
                    password: this.password,
                    school: this.selected_school,
                    department: this.selected_department,
                    designation: this.designation,
                    employee_number: this.employee_number,
                    registration_number: this.registration_number,
                    subjects: this.subjects,
                    university_email: this.university_email,
                    joining_date: this.joining_date,
                })
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }
    },
    computed: {
        isDisabled() {
            return !(this.profile_status && this.avatar_url && this.first_name && this.last_name && this.date_of_birth && this.gender && this.country && this.selected_state && this.selected_city && this.zip && this.street && this.phone && this.email && this.password && this.selected_school && this.selected_department && this.designation && this.employee_number && this.registration_number && this.subjects && this.university_email && this.joining_date);
        },
        filtered_departments() {
            if (!this.selected_school) {
                return [];
            }
            return this.departments.filter(department => department.school === this.selected_school);
        },
    }

}
</script>

<template>
    <Navbar></Navbar>
    <div class="page-wrapper">
        <div class="page-header d-print-none">
            <div class="container-xl">
                <div class="row g-2 align-items-center">
                    <div class="col">
                        <h2 class="page-title"> Teachers </h2>
                        <div class="text-muted mt-1">1-18 of 413 people</div>
                    </div>
                    <div class="col-auto ms-auto d-print-none">
                        <div class="d-flex">
                            <input type="search" class="form-control d-inline-block w-9 me-3"
                                   placeholder="Search teacher…"/>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-report">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                     viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                     stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M12 5l0 14"/>
                                    <path d="M5 12l14 0"/>
                                </svg>
                                Add Teacher </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Page body -->
        <div class="page-body">
            <div class="container-xl">
                <div class="row row-cards">
                    <div v-for="(user, index) in teacher" class="col-md-6 col-lg-3" :key="index">
                        <div class="card">
                            <div class="card-body p-4 text-center">
                                <span class="avatar avatar-xl mb-3 rounded"
                                      :style="{ backgroundImage: `url(${user.avatar_url})` }"></span>
                                <h3 class="m-0 mb-1">
                                    <router-link :to="'/admin/teacher/' + user._id">{{
                                        user.first_name + ' ' + user.last_name
                                        }}
                                    </router-link>
                                </h3>
                                <div class="text-muted">{{ user.designation }}</div>
                                <div class="mt-3">
                                    <span class="badge bg-purple-lt">{{ user.department }}</span>
                                </div>
                            </div>
                            <div class="d-flex">
                                <a :href="'mailto:' + user.email" class="card-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24"
                                         height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                         fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/>
                                        <path d="M3 7l9 6l9 -6"/>
                                    </svg>
                                    Email </a>
                                <a href="#" class="card-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-muted" width="24"
                                         height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                         fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"/>
                                    </svg>
                                    Call </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex mt-4">
                    <ul class="pagination ms-auto">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                     viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                     stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M15 6l-6 6l6 6"/>
                                </svg>
                                Prev </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item active">
                            <a class="page-link" href="#">2</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">3</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">4</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">5</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#"> Next
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                     viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                     stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 6l6 6l-6 6"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  <!--  Add Teacher Form-->
    <div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Teacher</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Profile Status</label>
                                <select class="form-select" v-model="profile_status" id="profile_status">
                                    <option value="Active">Active</option>
                                    <option value="Retired">Retired</option>
                                    <option value="Terminated">Terminated</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Avatar URL</label>
                                <input type="text" placeholder="https://avatars.githubusercontent.com/u/33594352"
                                       class="form-control" v-model="avatar_url" id="avatar_url">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">First Name</label>
                                <input type="text" placeholder="First name" class="form-control" v-model="first_name"
                                       id="first_name">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Last Name</label>
                                <input type="text" placeholder="First name" class="form-control" v-model="last_name"
                                       id="last_name">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Date Of Birth</label>
                                <input type="date" class="form-control" v-model="date_of_birth" id="date_of_birth">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Gender</label>
                                <select class="form-select" v-model="gender" id="gender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Country</label>
                                <select class="form-select" v-model="country" id="country">
                                    <option value="India">India</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">State</label>
                                <select class="form-select" v-model="selected_state" @change="get_cities"
                                        id="selected_state">
                                    <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">City</label>
                                <select class="form-select" v-model="selected_city" id="selected_city">
                                    <option v-for="city in cities" :value="city" :key="city">{{ city }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Pin code</label>
                                <input type="text" placeholder="700112" class="form-control" v-model="zip" id="zip">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Street address</label>
                                <input type="text" placeholder="Home address" class="form-control" v-model="street"
                                       id="street">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="text" placeholder="Personal phone number" class="form-control"
                                       v-model="phone" id="phone">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" placeholder="personal@email.com" class="form-control"
                                       v-model="email" id="email">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" placeholder="Choose a strong password" class="form-control"
                                       v-model="password" id="password">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">School</label>
                                <select class="form-select" v-model="selected_school"
                                        @change="selected_department = null">
                                    <option v-for="school in schools" :value="school">{{ school }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Department</label>
                                <select class="form-select" v-model="selected_department">
                                    <option v-for="department in filtered_departments" :value="department.department">
                                        {{ department.department }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Designation</label>
                                <select class="form-select" v-model="designation" id="designation">
                                    <option value="Assistant Professor">Assistant Professor</option>
                                    <option value="HOD">HOD</option>
                                    <option value="DEAN">DEAN</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Employee Number</label>
                                <input type="text" class="form-control" v-model="employee_number" id="employee_number">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Registration Number</label>
                                <input type="text" class="form-control" v-model="registration_number"
                                       id="registration_number">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Subjects</label>
                                <select class="form-select" v-model="subjects" id="subjects">
                                    <option value="DBMS">DBMS</option>
                                    <option value="Python">Python</option>
                                    <option value="Algorithm">Algorithm</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">University Email</label>
                                <input type="text" placeholder="someone@adamasuniversity.ac.in" class="form-control"
                                       v-model="university_email" id="university_email">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Date Of Joining</label>
                                <input type="date" class="form-control" v-model="joining_date" id="joining_date">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal"> Cancel </a>
                    <button @click.prevent="register" :disabled="isDisabled" data-bs-dismiss="modal" type="submit"
                            class="btn btn-primary ms-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                             stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                             stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 5l0 14"/>
                            <path d="M5 12l14 0"/>
                        </svg>
                        Add Teacher
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>
