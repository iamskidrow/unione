<script>
import Navbar from "@/components/Admin/Navbar.vue";
import axios from "axios";

export default {
    name: "Courses",
    components: {Navbar},
    data() {
        return {
            profile: {},
            courses: [],
            selectedCourse: '',
            maxSemesters: 10,
            course: {
                name: "",
                description: "",
                school: "",
                department: "",
                total_semesters: null,
                subjects: [{semester: "", subject_names: ""}], // Change empty array to empty string
            },
            schools: [],
            selected_school: null,
            departments: [],
            selected_department: null,
        }
    },
    watch: {
        'course.total_semesters'(newVal, oldVal) {
            if (newVal > oldVal) {
                for (let i = oldVal; i < newVal; i++) {
                    this.course.subjects.push({
                        semester: i + 1,
                        subject_names: ""
                    })
                }
            } else {
                this.course.subjects.splice(newVal)
            }
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

        axios.get('http://localhost:3000/api/courses')
            .then(response => {
                this.courses = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }, methods: {
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
        removeCourse() {
            axios.delete(`http://localhost:3000/api/course/${this.selectedCourse}`)
                .then(response => {
                    console.log(response.data);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        submitCourse() {
            axios.post('http://localhost:3000/api/course', {
                name: this.course.name,
                description: this.course.description,
                school: this.selected_school,
                department: this.selected_department,
                total_semesters: this.course.total_semesters,
                subjects: this.course.subjects
            })
                .then(response => {
                    console.log(response.data);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        updateSubjects(index) {
            let subjects = this.course.subjects;
            let lastSemester = subjects[subjects.length - 1].semester;
            if (index === subjects.length - 1 && lastSemester !== "") {
                subjects.push({semester: "", subject_names: ""});
            }
            if (index === subjects.length - 2 && lastSemester === "") {
                subjects.pop();
            }
            this.course.subjects = subjects.filter(subject => subject.semester !== "");
        },
        splitSubjectNames(subject) {
            subject.subject_names = subject.subject_names.split(',');
        }
    },
    mounted() {
        this.get_schools();
    },
    computed: {
        isDisabled() {
            return !(this.course.name && this.course.description && this.selected_school && this.selected_department && this.course.total_semesters && this.course.subjects);
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
        <!-- Page header -->
        <div class="page-header d-print-none">
            <div class="container-xl">
                <div class="row g-2 align-items-center">
                    <div class="col">
                        <!-- Page pre-title -->
                        <div class="page-pretitle">
                            Course
                        </div>
                        <h2 class="page-title">
                            Welcome, {{ profile.first_name }} 👋
                        </h2>
                    </div>
                    <!-- Page title actions -->
                    <div class="col-12 col-md-auto ms-auto d-print-none">
                        <div class="btn-list">
                                              <span class="d-none d-sm-inline">
                                                <a href="#" class="btn " data-bs-toggle="modal"
                                                   data-bs-target="#modal-team">
                                                  Remove Course
                                                </a>
                                              </span>
                            <a href="#" class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal"
                               data-bs-target="#add_course">
                                Add Course
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Page body -->
        <div class="page-body">
            <div class="container-xl">
                <div class="card card-lg">
                    <div class="card-body">
                        <div class="space-y-4">
                            <div v-for="(course, index) in courses" :key="index">
                                <h2 class="mb-3">{{ course.name }}</h2>
                                <p>
                                    {{ course.description }}
                                    <br><br>
                                    <b>School:</b> <i>{{ course.school }}</i>
                                    <br>
                                    <b>Department:</b> <i>{{ course.department }}</i>
                                    <br>
                                    <b>Total Semesters:</b> <i>{{ course.total_semesters }}</i>
                                </p>
                                <div :id="'faq-' + index" class="accordion" role="tablist" aria-multiselectable="true">
                                    <div v-for="(semester, semesterIndex) in course.subjects" :key="semesterIndex"
                                         class="accordion-item">
                                        <div class="accordion-header" role="tab">
                                            <button class="accordion-button collapsed" data-bs-toggle="collapse"
                                                    :data-bs-target="'#faq-' + index + '-' + (semesterIndex + 2)">
                                                Semester {{ semester.semester }}
                                            </button>
                                        </div>
                                        <div :id="'faq-' + index + '-' + (semesterIndex + 2)"
                                             class="accordion-collapse collapse"
                                             role="tabpanel" :data-bs-parent="'#faq-' + index">
                                            <div class="accordion-body pt-0">
                                                <div>
                                                    <ul>
                                                        <li v-for="subject in semester.subject_names">{{ subject }}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add new notice modal -->
        <div class="modal modal-blur fade" id="add_course" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Course</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input type="text" placeholder="Course Name" class="form-control"
                                           v-model="course.name"
                                           id="name">
                                </div>
                            </div>
                            <div>
                                <label class="form-label">Description</label>
                                <textarea class="form-control" v-model="course.description" id="description"></textarea>
                                <br>
                            </div>
                            <div class="col-lg-4">
                                <div class="mb-3">
                                    <label class="form-label">School</label>
                                    <select class="form-select" v-model="selected_school"
                                            @change="selected_department = null">
                                        <option v-for="school in schools" :value="school">{{ school }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="mb-3">
                                    <label class="form-label">Department</label>
                                    <select class="form-select" v-model="selected_department">
                                        <option v-for="department in filtered_departments"
                                                :value="department.department">
                                            {{ department.department }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="mb-3">
                                    <label class="form-label">Total Semesters</label>
                                    <select class="form-select" v-model="course.total_semesters">
                                        <option v-for="i in 10" :value="i">{{ i }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-12">
                                <div v-for="i in course.total_semesters" :key="i" class="mb-3">
                                    <label class="form-label">Semester {{ i }}</label>
                                    <input type="text" placeholder="Enter subject names separated by commas"
                                           class="form-control"
                                           v-model="course.subjects[i-1].subject_names"
                                           @input="updateSubjects(i-1); splitSubjectNames(course.subjects[i-1])">
                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"
                                @click.prevent="submitCourse" :disabled="isDisabled">Add Course
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Remove team modal -->
        <div class="modal modal-blur fade" id="modal-team" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Remove a Course</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label class="form-label">Select Course</label>
                            <select class="form-select" v-model="selectedCourse" id="course">
                                <option v-for="course in courses" :value="course._id">{{ course.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" @click="removeCourse" data-bs-dismiss="modal">
                            Remove Course
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>


