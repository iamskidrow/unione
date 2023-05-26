<script>
import Navbar from "@/components/Teacher/Navbar.vue";
import axios from "axios";

export default {
  name: "Attendance",
  components: {Navbar},
  data() {
    return {
      profile: {},
      selectedCourse: "",
      selectedSemester: "",
      selectedSubject: "",
      courses: [],
      semesters: [],
      subjects: [],
      students: [],
      attendances: [],
    }
  }, async created() {
    const userInfo = await this.getUserInfo();
    const teacherId = userInfo._id;

    axios.get(`http://localhost:3000/api/teacher/${teacherId}`)
        .then(response => {
          this.profile = response.data;
        })
        .catch(error => {
          console.log(error);
        });

    this.fetchAttendances();
  },
  async mounted() {
    await this.fetchCourses();
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
      axios
          .get(`http://localhost:3000/api/course/${this.selectedCourse}`)
          .then(response => {
            const subjects = response.data.subjects;
            const selectedSemesterSubjects = subjects.find(subject => subject.semester === this.selectedSemester);
            if (selectedSemesterSubjects && selectedSemesterSubjects.subject_names) {
              this.subjects = selectedSemesterSubjects.subject_names;
              this.fetchStudents();
            } else {
              this.subjects = []; // Set subjects to an empty array if no subjects found
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    fetchStudents() {
      axios.get('http://localhost:3000/api/students')
          .then(response => {
            this.students = response.data.filter(student => {
              return student.course_id === this.selectedCourse && parseInt(student.current_semester) === this.selectedSemester;
            });
          })
          .catch(error => {
            console.log(error);
          });
    },
    getStudentInfo(studentId) {
      const student = this.students.find((student) => student._id === studentId);
      if (student) {
        const fullName = `${student.first_name} ${student.last_name}`;
        return {name: fullName, roll_number: student.roll_number};
      } else {
        return {name: "", roll_number: ""};
      }
    },
    fetchAttendances() {
      axios
          .get("http://localhost:3000/api/attendances", {
            params: {
              course_id: this.selectedCourse,
              semester: this.selectedSemester,
              teacher_id: this.profile._id
            }
          })
          .then((response) => {
            this.attendances = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          })
          .catch((error) => {
            console.error(error);
          });
    },
    markAttendance(student, status) {
      const data = {
        course_id: this.selectedCourse,
        semester: this.selectedSemester,
        student_id: student._id,
        subject: this.selectedSubject,
        date: new Date().toISOString(),
        status,
        teacher_id: this.profile._id,
      };
      axios.post('http://localhost:3000/api/attendance', data)
          .then(response => {
            if (status === 'Present') {
              student.Present = true;
              student.Absent = false;
            } else {
              student.Present = false;
              student.Absent = true;
            }
          })
          .catch(error => {
            console.log(error);
          });
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
            <div class="page-pretitle">
              Attendance
            </div>
            <h2 class="page-title">
              Welcome, {{ profile.first_name }} 👋
            </h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <div class="row">
                <div class="col-auto">
                  <select class="form-select" v-model="selectedCourse" @change="fetchSemesters">
                    <option v-for="course in courses" :value="course._id">{{ course.name }}</option>
                  </select>
                </div>
                <div class="col-auto">
                  <select class="form-select" v-model="selectedSemester"
                          :disabled="semesters.length === 0"
                          @change="fetchSubjects">
                    <option v-for="semester in semesters" :value="semester">{{ semester }}</option>
                  </select>
                </div>
              </div>
              <a href="#" class="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal"
                 data-bs-target="#modal-new-attendance">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                     viewBox="0 0 24 24"
                     stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 5l0 14"/>
                  <path d="M5 12l14 0"/>
                </svg>
                Attendance
              </a>
              <a href="#" class="btn btn-primary d-sm-none btn-icon" data-bs-toggle="modal"
                 data-bs-target="#modal-report" aria-label="Create new report">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                     viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                     stroke-linecap="round" stroke-linejoin="round">
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

    <div className="page-wrapper">
      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="card-body">
              <div id="table-default" className="table-responsive">
                <table className="table">
                  <thead>
                  <tr>
                    <th>
                      <button className="table-sort" data-sort="sort-date">Date</button>
                    </th>
                    <th>
                      <button className="table-sort" data-sort="sort-subject">Subject</button>
                    </th>
                    <th>
                      <button className="table-sort" data-sort="sort-name">Name</button>
                    </th>
                    <th>
                      <button className="table-sort" data-sort="sort-roll">Roll</button>
                    </th>
                    <th>
                      <button className="table-sort" data-sort="sort-status">Status</button>
                    </th>
                  </tr>
                  </thead>
                  <tbody class="table-tbody">
                  <tr v-for="attendance in attendances" :key="attendance._id">
                    <td>{{ formatDate(attendance.date) }}</td>
                    <td>{{ attendance.subject }}</td>
                    <td>{{ getStudentInfo(attendance.student_id).name }}</td>
                    <td>{{ getStudentInfo(attendance.student_id).roll_number }}</td>
                    <td class="w-1">{{ attendance.status }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal modal-blur fade" id="modal-new-attendance" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Result</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-12">
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
                        :disabled="subjects.length === 0" @change="fetchStudents">
                  <option v-for="subject in subjects" :value="subject">{{ subject }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-12">
              <div class="mb-auto">
                <table class="table table-center table-vcenter">
                  <thead>
                  <tr>
                    <th>Roll</th>
                    <th>Name</th>
                    <th>Absent</th>
                    <th>Present</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="student in students" :key="student._id">
                    <td class="text-muted">{{ student.roll_number }}</td>
                    <td class="text-muted">{{ student.first_name + ' ' + student.last_name }}</td>
                    <td>
                      <button :class="{'btn btn-danger': student.Absent, 'btn btn-ghost-danger': !student.Absent}"
                              @click="markAttendance(student, 'Absent')">Absent
                      </button>
                    </td>
                    <td>
                      <button :class="{'btn btn-success': student.Present, 'btn btn-ghost-success': !student.Present}"
                              @click="markAttendance(student, 'Present')">Present
                      </button>
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
  </div>

</template>

