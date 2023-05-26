<script>
import Navbar from "@/components/Teacher/Navbar.vue";
import axios from "axios";

export default {
  name: "Exams",
  components: {Navbar},
  data() {
    return {
      profile: {},
      exams: [],
      filtered_exams: [],
      students: [],
      selectedCourse: "",
      selectedSemester: "",
      selectedSubject: "",
      selectedExam: "",
      exam_name: '',
      date: '',
      start_time: '',
      end_time: '',
      marks: '',
      questionsText: '',
      questions: [],
      courses: [],
      semesters: [],
      subjects: []
    }
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
  },
  mounted() {
    this.fetchCourses();
    this.fetchExams();
  },
  computed: {
    isDisabled() {
      return !(this.selectedCourse && this.selectedSemester && this.selectedSubject && this.marks && this.exam_name && this.formatDate(Date.now()) && this.start_time && this.end_time && this.profile._id && this.questions);
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
    fetchStudents() {
      try {
        axios.get('http://localhost:3000/api/students', {
          params: {
            course_id: this.selectedCourse,
            current_semester: this.selectedSemester
          }
        })
            .then((response) => {
              this.students = response.data;
            })
            .catch((error) => {
              console.error(error);
            });
      } catch (error) {
        console.error(error);
      }
    },
    filteredExams() {
      try {
        axios
            .get("http://localhost:3000/api/exams", {
              params: {
                course_id: this.selectedCourse,
                semester: this.selectedSemester,
                subject: this.selectedSubject,
              },
            })
            .then((response) => {
              this.filtered_exams = response.data; // Store filtered exams in filtered_exams array
              this.fetchStudents(); // Fetch students after selecting exam
            })
            .catch((error) => {
              console.error(error);
            });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchExams() {
      const userInfo = await this.getUserInfo();
      const posted_by = userInfo._id;

      axios
          .get(`http://localhost:3000/api/exams`, {
            params: {
              posted_by: posted_by,
            }
          })
          .then((response) => {
            this.exams = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    addResult() {
      this.students.forEach((student) => {
        const result = {
          student_id: student._id,
          exam_id: this.selectedExam,
          marks: student.marks,
        };

        axios
            .post('http://localhost:3000/api/result', result)
            .then((response) => {
              // Handle success response
              console.log('Result added successfully:', response.data);
            })
            .catch((error) => {
              // Handle error response
              console.error('Failed to add result:', error);
            });
      });
    },
    async createExam() {
      try {
        const response = await axios.post('http://localhost:3000/api/exam', {
          course_id: this.selectedCourse,
          semester: this.selectedSemester,
          subject: this.selectedSubject,
          marks: this.marks,
          exam_name: this.exam_name,
          date: this.formatDate(Date.now()),
          start_time: this.start_time,
          end_time: this.end_time,
          posted_by: this.profile._id,
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

  <div className="page-wrapper">
    <div className="page-header d-print-none">
      <div className="container-xl">
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">
              Exams
            </div>
            <h2 className="page-title">
              Welcome, {{ profile.first_name }} 👋
            </h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
                            <span class="d-none d-sm-inline">
                                <a href="#" class="btn btn-secondary" data-bs-toggle="modal"
                                   data-bs-target="#modal-upload-result">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-report"
                                         width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                         stroke="currentColor" fill="none" stroke-linecap="round"
                                         stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
                                        d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697"></path>
                                        <path d="M18 14v4h4"></path>
                                        <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2"></path>
                                        <path
                                            d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                                        <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                                        <path d="M8 11h4"></path>
                                        <path d="M8 15h3"></path>
                                    </svg>

                                    Upload Result
                                </a>
                            </span>
              <a href="#" class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal"
                 data-bs-target="#modal-new-exam">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                     viewBox="0 0 24 24"
                     stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 5l0 14"/>
                  <path d="M5 12l14 0"/>
                </svg>
                New Exam
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="page-body">
      <div className="container-xl">
        <div className="col-12">
          <div className="card">
            <div className="table-responsive">
              <table className="table table-vcenter table-mobile-md card-table">
                <thead>
                <tr>
                  <th>About</th>
                  <th>Marks</th>
                  <th>Time</th>
                  <th className="w-1">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="exam in exams" :key="exam._id">
                  <td data-label="Name">
                    <div className="d-flex py-1 align-items-center">
                      <div className="flex-fill">
                        <div className="font-weight-medium">{{ exam.exam_name }}</div>
                        <div className="text-muted">{{ exam.subject }}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Title">
                    <div>Total Marks</div>
                    <div className="text-muted">{{ exam.marks }}</div>
                  </td>
                  <td data-label="Role">
                    <div>{{ exam.date }}</div>
                    <div className="text-muted">{{ exam.start_time }} - {{ exam.end_time }}</div>
                  </td>
                  <td>
                    <div className="btn-list flex-nowrap">
                      <router-link :to="'/teacher/exam/' + exam._id"
                                   className="btn btn-outline-primary">
                        View
                      </router-link>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal modal-blur fade" id="modal-new-exam" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Exam</h5>
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
                <label class="form-label">Exam Name</label>
                <input type="text" placeholder="Name of the Exam" class="form-control"
                       v-model="exam_name" id="mother_occupation">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Total Marks</label>
                <input type="text" placeholder="Total marks" class="form-control"
                       v-model="marks" id="mother_occupation">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Date</label>
                <input type="date" class="form-control" v-model="date" id="joining_date">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Start Time</label>
                <input type="text" placeholder="Starting Time" class="form-control"
                       v-model="start_time" id="mother_occupation">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">End Time</label>
                <input type="text" placeholder="Ending Time" class="form-control"
                       v-model="end_time" id="mother_occupation">
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
          <button @click.prevent="createExam" :disabled="isDisabled" data-bs-dismiss="modal" type="submit"
                  class="btn btn-primary ms-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                 stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                 stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 5l0 14"/>
              <path d="M5 12l14 0"/>
            </svg>
            Add Exam
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal modal-blur fade" id="modal-upload-result" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Result</h5>
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
                        :disabled="subjects.length === 0" @change="filteredExams">
                  <option v-for="subject in subjects" :value="subject">{{ subject }}</option>
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Exam Name</label>
                <select v-model="selectedExam" class="form-select" id="selectedExam" @change="fetchStudents">
                  <option v-for="exam in filtered_exams" :value="exam._id">{{
                      exam.exam_name + ' - ' + exam.date
                    }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="mb-auto">
                <table class="table table-center table-vcenter">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll</th>
                    <th>Marks</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="student in students" :key="student._id">
                    <td>{{ student.first_name + ' ' + student.last_name }}</td>
                    <td class="text-muted">{{ student.roll_number }}</td>
                    <td class="text-muted w-auto">
                      <input type="text" placeholder="Marks" class="form-control" v-model="student.marks">
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal"> Cancel </a>
          <button @click.prevent="addResult" data-bs-dismiss="modal" type="submit"
                  class="btn btn-primary ms-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                 stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                 stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 5l0 14"/>
              <path d="M5 12l14 0"/>
            </svg>
            Add Result
          </button>
        </div>
      </div>
    </div>
  </div>


</template>

