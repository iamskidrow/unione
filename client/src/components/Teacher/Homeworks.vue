<script>

import Navbar from "@/components/Teacher/Navbar.vue";
import axios from "axios";

export default {
  name: "Homeworks",
  components: {Navbar},
  data() {
    return {
      profile: {},
      fields: ['Assigned On', 'Subject', 'Title', 'Last Submission', 'Status', 'Action'],
      homeworks: [],
      selectedCourse: "",
      selectedSemester: "",
      selectedSubject: "",
      title: '',
      assignedOn: '',
      lastSubmission: '',
      questionsText: '',
      questions: [],
      courses: [],
      semesters: [],
      subjects: []

    }
  },
  mounted() {
    this.fetchHomeworks();
  },
  computed: {
    isDisabled() {
      return !(this.selectedCourse && this.selectedSemester && this.selectedSubject && this.title && this.formatDate(Date.now()) && this.formatDate(this.lastSubmission) && this.profile._id && this.questions);
    },
    questionArray() {
      return this.questionsText.split('\n');
    },
  },
  watch: {
    questionArray(newQuestions) {
      this.questions = newQuestions;
    },
  },
  async created() {
    const userInfo = await this.getUserInfo();
    const teacherId = userInfo._id;
    axios.get(`http://localhost:3000/api/teacher/${teacherId}`)
        .then(response => {
          this.profile = response.data;
        })
        .catch(error => {
          console.log(error);
        });

    this.fetchCourses();
  },
  methods: {
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
    // Get user info
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
    fetchCourses() {
      axios
          .get("http://localhost:3000/api/courses")
          .then((response) => {
            this.courses = response.data;
            this.selectedCourse = this.courses[0]._id;
            this.fetchSemesters();
          })
          .catch((error) => {
            console.error(error);
          });
    },
    fetchSemesters() {
      axios
          .get(`http://localhost:3000/api/course/${this.selectedCourse}`)
          .then((response) => {
            const totalSemesters = response.data.total_semesters;
            this.semesters = Array.from({length: totalSemesters}, (_, i) => i + 1);
            this.selectedSemester = this.semesters[0];
            this.fetchSubjects(); // add this line
          })
          .catch((error) => {
            console.error(error);
          });
    },
    fetchSubjects() {
      axios.get(`http://localhost:3000/api/course/${this.selectedCourse}`)
          .then(response => {
            const subjects = response.data.subjects;
            const selectedSemesterSubjects = subjects.find(subject => subject.semester === this.selectedSemester);
            this.subjects = selectedSemesterSubjects.subject_names;
          })
          .catch(error => {
            console.error(error);
          });
    },
    async fetchHomeworks() {
      try {
        const userInfo = await this.getUserInfo();
        const assigned_by = userInfo._id;
        const response = await axios.get(`http://localhost:3000/api/homeworks`, {
          params: {
            assigned_by: assigned_by,
          }
        });
        const homeworks = response.data;

        // Fetch answers and calculate submission percentage for each homework
        const promises = homeworks.map(async (homework) => {
          const homeworkId = homework._id;
          const answersResponse = await axios.get(`http://localhost:3000/api/homework/${homeworkId}/answers`);
          const answers = answersResponse.data.answers; // Get the answers array from the response

          const courseResponse = await axios.get(`http://localhost:3000/api/homework/${homeworkId}`);
          const {course_id, semester} = courseResponse.data;

          const studentsResponse = await axios.get(`http://localhost:3000/api/students`, {
            params: {
              course_id: course_id,
              semester: semester,
            }
          });
          const students = studentsResponse.data;

          const totalStudents = students.length;
          const totalAnswers = answers.length;

          const submissionPercentage = totalStudents > 0 ? Math.round((totalAnswers / totalStudents) * 100) : 0;

          // Update the homework object with answers and submission percentage
          homework.answers = answers;
          homework.submissionPercentage = submissionPercentage;
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        // Update the homeworks in your component's data
        this.homeworks = homeworks;
      } catch (error) {
        console.error(error);
      }
    },
    async createHomework() {
      try {
        const response = await axios.post('http://localhost:3000/api/homework', {
          course_id: this.selectedCourse,
          semester: this.selectedSemester,
          subject: this.selectedSubject,
          title: this.title,
          from_date: this.formatDate(Date.now()),
          to_date: this.formatDate(this.lastSubmission),
          assigned_by: this.profile._id,
          questions: this.questions
        })
        console.log(response.data)
        window.location.reload();
      } catch (error) {
        console.error(error)
      }
      // console.log(this.questionArray)
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
            <!-- Page pre-title -->
            <div class="page-pretitle">
              Homeworks
            </div>
            <h2 class="page-title">
              Welcome, {{ profile.first_name }} 👋
            </h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <a href="#" class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal"
                 data-bs-target="#modal-report">
                Add Homework
              </a>
              <a href="#" class="btn btn-primary d-sm-none btn-icon" data-bs-toggle="modal"
                 data-bs-target="#modal-report" aria-label="Create new report">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                     viewBox="0 0 24 24"
                     stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container-xl">
        <div class="card">
          <div id="table-default" class="table-responsive">
            <table class="table table-center table-vcenter">
              <thead>
              <tr>
                <th>Assigned On</th>
                <th>Subject</th>
                <th>Title</th>
                <th>Last Submission</th>
                <th>Submission</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(homework, index) in homeworks" :key="index">
                <td>{{ homework.from_date }}</td>
                <td class="text-muted">{{ homework.subject }}</td>
                <td class="text-muted">{{ homework.title }}</td>
                <td>{{ homework.to_date }}</td>
<!--                <td>{{ homework.submissionPercentage }}% submission</td>-->
                <td>
                  <div className="row align-items-center">
                    <div className="col-12 col-lg-auto">{{
                        homework.submissionPercentage
                      }}%
                    </div>
                    <div className="col">
                      <div className="progress">
                        <div className="progress-bar"
                             :style="{ width: `${homework.submissionPercentage}%`}"
                             role="progressbar" aria-valuenow="30"
                             aria-valuemin="0" aria-valuemax="100"
                             aria-label="{{ homework.submissionPercentage }}% Complete">
                                                            <span className="visually-hidden">{{
                                                                homework.submissionPercentage
                                                              }}% Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <router-link :to="'/teacher/homework/' + homework._id">View</router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal modal-blur fade" id="modal-report" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Homework</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Course</label>
                <select class="form-select" v-model="selectedCourse" @change="fetchSemesters">
                  <option v-for="course in courses" :value="course._id">{{ course.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Semester</label>
                <select class="form-select" v-model="selectedSemester"
                        :disabled="semesters.length === 0"
                        @change="fetchSubjects">
                  <option v-for="semester in semesters" :value="semester">{{ semester }}</option>
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Subject</label>
                <select v-model="selectedSubject" class="form-select" id="subject"
                        :disabled="subjects.length === 0">
                  <option v-for="subject in subjects" :value="subject">{{ subject }}</option>
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" placeholder="Title of the homework" class="form-control"
                       v-model="title" id="mother_occupation">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Assigned on</label>
                <input disabled type="date" class="form-control" v-model="assignedOn" id="joining_date">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Last submission</label>
                <input type="date" class="form-control" v-model="lastSubmission" id="joining_date">
              </div>
            </div>
            <div>
              <label class="form-label">Questions</label>
              <textarea class="form-control" id="notice" rows="5"
                        placeholder="Enter the questions with new lines"
                        v-model="questionsText"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal"> Cancel </a>
          <button @click.prevent="createHomework" :disabled="isDisabled" data-bs-dismiss="modal" type="submit"
                  class="btn btn-primary ms-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                 stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                 stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 5l0 14"/>
              <path d="M5 12l14 0"/>
            </svg>
            Add Homework
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

