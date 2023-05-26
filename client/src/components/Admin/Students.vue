<script>
import Navbar from "@/components/Admin/Navbar.vue";
import axios from "axios";

export default {
    name: "Students",
    components: {
        Navbar
    },
    data() {
        return {
            student: {},

            states: [],
            cities: [],
            selected_state: '',
            selected_city: '',

            schools: [],
            selected_school: null,
            departments: [],
            selected_department: null,

            religions: [],

            courses: [],
            selected_course_name: '',
            selected_course_id: '',

            profile_status: "",
            avatar_url: "",
            first_name: "",
            last_name: "",
            date_of_birth: "",
            gender: "",
            religion: "",
            address: {
                street: "",
                city: "",
                state: "",
                zip: "",
                country: "",
            },
            phone: "",
            email: "",
            password: "",
            school: "",
            department: "",
            roll_number: "",
            registration_number: "",
            course: "",
            course_id: "",
            current_semester: "",
            current_year: "",
            session: "",
            university_email: "",
            admission_date: "",
            father: {
                name: "",
                phone: "",
                email: "",
                occupation: "",
            },
            mother: {
                name: "",
                phone: "",
                email: "",
                occupation: "",
            },
        }
    },
    mounted() {
        // Fetch states and cities from JSON file
        axios.get('/src/assets/static/states+cities.json')
            .then(response => {
                this.states = Object.keys(response.data);
                this.states.sort();
            })
            .catch(error => {
                console.log(error);
            });

        this.getReligions();
        this.get_schools();
        this.getCourses();
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

        axios.get('http://localhost:3000/api/students')
            .then(response => {
                this.student = response.data;
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
        getReligions() {
            axios.get('/src/assets/static/religion.json')
                .then(response => {
                    this.religions = response.data.religions;
                })
                .catch(error => {
                    console.log(error);
                });
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
        getCourses() {
            axios.get('http://localhost:3000/api/courses')
                .then(response => {
                    this.courses = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // Login Handler
        async register() {
            try {
                const response = await axios.post('http://localhost:3000/api/student/', {
                    profile_status: this.profile_status,
                    avatar_url: this.avatar_url,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    date_of_birth: this.date_of_birth,
                    gender: this.gender,
                    religion: this.religion,
                    address: {
                        street: this.address.street,
                        city: this.selected_city,
                        state: this.selected_state,
                        zip: this.address.zip,
                        country: this.address.country,
                    },
                    phone: this.phone,
                    email: this.email,
                    password: this.password,
                    school: this.selected_school,
                    department: this.selected_department,
                    roll_number: this.roll_number,
                    registration_number: this.registration_number,
                    course: this.course.name,
                    course_id: this.course._id,
                    current_semester: "1",
                    current_year: "1",
                    session: "2020 - 2023",
                    university_email: this.university_email,
                    admission_date: this.admission_date,
                    father: {
                        name: this.father.name,
                        phone: this.father.phone,
                        email: this.father.email,
                        occupation: this.father.occupation,
                    },
                    mother: {
                        name: this.mother.name,
                        phone: this.mother.phone,
                        email: this.mother.email,
                        occupation: this.mother.occupation,
                    },
                })
                console.log(response.data)
                window.location.reload();
            } catch (error) {
                console.error(error)
            }
        }
    },
    computed: {
        isDisabled() {
            return !(this.profile_status && this.avatar_url && this.first_name && this.last_name && this.date_of_birth && this.gender && this.religion && this.address.street && this.selected_city && this.selected_state && this.address.zip && this.address.country && this.phone && this.email && this.password && this.selected_school && this.selected_department && this.roll_number && this.registration_number && this.course && this.university_email && this.admission_date && this.father.name && this.father.phone && this.father.email && this.father.occupation && this.mother.name && this.mother.phone && this.mother.email && this.mother.occupation);
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
                        <h2 class="page-title">
                            Students
                        </h2>
                        <div class="text-muted mt-1">1-18 of 413 people</div>
                    </div>
                    <div class="col-auto ms-auto d-print-none">
                        <div class="d-flex">
                            <input type="search" class="form-control d-inline-block w-9 me-3"
                                   placeholder="Search student…"/>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-report">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                     viewBox="0 0 24 24"
                                     stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                     stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M12 5l0 14"/>
                                    <path d="M5 12l14 0"/>
                                </svg>
                                Add Student
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Page body -->
        <div class="page-body">
            <div class="container-xl">
                <div class="row row-cards">
                    <div v-for="(user, index) in student" class="col-md-6 col-lg-3" :key="index">
                        <div class="card">
                            <div class="card-body p-4 text-center">
                                <span class="avatar avatar-xl mb-3 rounded"
                                      :style="{ backgroundImage: `url(${user.avatar_url})` }"></span>
                                <h3 class="m-0 mb-1">
                                    <router-link :to="'/admin/student/' + user._id">{{
                                            user.first_name + ' ' + user.last_name
                                        }}
                                    </router-link>
                                </h3>
                                <div class="text-muted">{{ user.course + '(' + user.current_semester + ')' }}</div>
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

    <div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Student</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Profile Status</label>
                                <select class="form-select" v-model="profile_status" id="profile_status">
                                    <option value="Active">Active</option>
                                    <option value="Left">Left</option>
                                    <option value="Suspended">Suspended</option>
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
                                <label class="form-label">Religion</label>
                                <select class="form-select" v-model="religion" id="religion">
                                    <option v-for="religion in religions" :value="religion">{{ religion }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Country</label>
                                <select class="form-select" v-model="address.country" id="country">
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
                                <input type="text" placeholder="700112" class="form-control" v-model="address.zip"
                                       id="zip">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Street address</label>
                                <input type="text" placeholder="Home address" class="form-control"
                                       v-model="address.street"
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
                                <label class="form-label">University Email</label>
                                <input type="text" placeholder="someone@adamasuniversity.ac.in" class="form-control"
                                       v-model="university_email" id="university_email">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Father's Name</label>
                                <input type="text" placeholder="Full name of father" class="form-control"
                                       v-model="father.name" id="father_name">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Father's Phone</label>
                                <input type="text" placeholder="Number of father" class="form-control"
                                       v-model="father.phone" id="father_phone">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Father's Email</label>
                                <input type="text" placeholder="Email ID of father" class="form-control"
                                       v-model="father.email" id="father_email">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Father's Occupation</label>
                                <input type="text" placeholder="Occupation of father" class="form-control"
                                       v-model="father.occupation" id="father_occupation">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Mother's Name</label>
                                <input type="text" placeholder="Full name of mother" class="form-control"
                                       v-model="mother.name" id="mother_name">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Mother's Phone</label>
                                <input type="text" placeholder="Number of mother" class="form-control"
                                       v-model="mother.phone" id="mother_phone">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Mother's Email</label>
                                <input type="text" placeholder="Email ID of mother" class="form-control"
                                       v-model="mother.email" id="mother_email">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Mother's Occupation</label>
                                <input type="text" placeholder="Occupation of mother" class="form-control"
                                       v-model="mother.occupation" id="mother_occupation">
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
                                <label class="form-label">Course</label>
                                <select class="form-select" v-model="course" id="subjects">
                                    <option v-for="option in courses" :value="{_id: option._id, name: option.name}">{{ option.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Roll Number</label>
                                <input type="text" class="form-control" v-model="roll_number" id="employee_number">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Registration Number</label>
                                <input type="text" class="form-control" v-model="registration_number"
                                       id="registration_number">
                            </div>
                        </div>

                        <!--                        <div class="col-lg-6">-->
                        <!--                            <div class="mb-3">-->
                        <!--                                <label class="form-label">Current Semester</label>-->
                        <!--                                <input type="text" placeholder="someone@adamasuniversity.ac.in" class="form-control"-->
                        <!--                                       v-model="university_email" id="university_email">-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                        <!--                        <div class="col-lg-6">-->
                        <!--                            <div class="mb-3">-->
                        <!--                                <label class="form-label">Current Year</label>-->
                        <!--                                <input type="text" placeholder="someone@adamasuniversity.ac.in" class="form-control"-->
                        <!--                                       v-model="university_email" id="university_email">-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                        <!--                        <div class="col-lg-6">-->
                        <!--                            <div class="mb-3">-->
                        <!--                                <label class="form-label">Session</label>-->
                        <!--                                <input type="text" placeholder="someone@adamasuniversity.ac.in" class="form-control"-->
                        <!--                                       v-model="university_email" id="university_email">-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Admission Date</label>
                                <input type="date" class="form-control" v-model="admission_date" id="joining_date">
                            </div>
                        </div>
                    </div>
                </div>
                <!--                <div class="modal-body">-->
                <!--                    <div class="row">-->
                <!--                        <div class="col-lg-6">-->
                <!--                            <div class="mb-3">-->
                <!--                                <label class="form-label">Avatar URL</label>-->
                <!--                                <input type="text" placeholder="https://avatars.githubusercontent.com/u/33594352"-->
                <!--                                       class="form-control" v-model="avatar_url" id="avatar_url">-->
                <!--                            </div>-->
                <!--                        </div>-->
                <!--                        <div class="col-lg-6">-->
                <!--                            <div class="mb-3">-->
                <!--                                <label class="form-label">Avatar URL</label>-->
                <!--                                <input type="text" placeholder="https://avatars.githubusercontent.com/u/33594352"-->
                <!--                                       class="form-control" v-model="avatar_url" id="avatar_url">-->
                <!--                            </div>-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--                </div>-->
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
                        Add Student
                    </button>
                </div>
            </div>
        </div>
    </div>


</template>
