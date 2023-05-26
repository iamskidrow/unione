<script>
import Navbar from "@/components/Teacher/Navbar.vue";
import axios from "axios";

export default {
  name: "ViewHomework",
  components: {Navbar},
  data() {
    return {
      profile: {},
      homework: {},
      course: {},
      teacher: {},
      answers: [],
    }
  },
  async created() {
    const homeworkId = this.$route.params.id;
    const userInfo = await this.getUserInfo();
    const teacherId = userInfo._id;

    axios.get(`http://localhost:3000/api/teacher/${teacherId}`)
        .then(response => {
          this.profile = response.data;
        })
        .catch(error => {
          console.log(error);
        });

    // Fetch homework details
    axios.get(`http://localhost:3000/api/homework/${homeworkId}`)
        .then(response => {
          this.homework = response.data;

          // Fetch course details
          const courseId = this.homework.course_id;
          axios.get(`http://localhost:3000/api/course/${courseId}`)
              .then(response => {
                this.course = response.data;
              })
              .catch(error => {
                console.log(error);
              });

          // Fetch teacher details
          const teacherId = this.homework.assigned_by;
          axios.get(`http://localhost:3000/api/teacher/${teacherId}`)
              .then(response => {
                this.teacher = response.data;
              })
              .catch(error => {
                console.log(error);
              });

          // Fetch answers
          axios.get(`http://localhost:3000/api/homework/${homeworkId}/answers`)
              .then(response => {
                const answers = response.data.answers;

                // Loop through answers and fetch student details
                answers.forEach(answer => {
                  const studentId = answer.student;
                  axios.get(`http://localhost:3000/api/student/${studentId}`)
                      .then(response => {
                        answer.student = response.data;
                        this.answers = [...this.answers, answer]; // add the modified answer to the answers array
                      })
                      .catch(error => {
                        console.log(error);
                      });
                });
              })
              .catch(error => {
                console.log(error);
              });
        })
        .catch(error => {
          console.log(error);
        });
  },
  mounted() {
  },
  methods: {
    printDiv() {
      let printContents = this.$refs.print_homework.innerHTML;
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
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
    async deleteHomework() {
      const homeworkId = this.$route.params.id;
      try {
        const response = await axios.delete(`http://localhost:3000/api/homework/${homeworkId}`);
        console.log(response.data);
        // Redirect to homepage after deleting the homework
        this.$router.push('/teacher/homeworks');
      } catch (error) {
        console.log(error);
      }
    },
  },
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
              Homework
            </div>
            <h2 class="page-title">
              Welcome, {{ profile.first_name }} 👋
            </h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <button type="button" class="btn btn-ghost-danger" @click="deleteHomework">
                Delete Homework
              </button>
              <button type="button" class="btn btn-primary" @click="printDiv">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                     viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
                  <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
                  <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
                </svg>
                Print Homework
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-body" ref="print_homework">
      <div class="container-xl">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-9">
            <div class="card card-lg">
              <div class="card-body markdown">

                <div class="text-center mb-4"><a href="#"
                                                 class="navbar-brand navbar-brand-autodark"><img
                    src="/src/assets/static/logo.png" alt="" height="45"></a></div>

                <table class="table table-vcenter card-table">
                  <thead>
                  <tr>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="text-center w-50">
                      <div><b>Course</b></div>
                      <div class="text-muted">
                        {{ course.name + ',' + homework.semester }}
                      </div>
                    </td>
                    <td class="text-center w-50">
                      <div><b>Teacher</b></div>
                      <div class="text-muted">{{ teacher.first_name + ' ' + teacher.last_name }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center w-50">
                      <div><b>Subject</b></div>
                      <div class="text-muted">{{ homework.subject }}</div>
                    </td>
                    <td class="text-center w-50">
                      <div><b>Title</b></div>
                      <div class="text-muted">{{ homework.title }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center w-50">
                      <div><b>Assigned On</b></div>
                      <div class="text-muted">{{ homework.from_date }}</div>
                    </td>
                    <td class="text-center w-50">
                      <div><b>Last Submission</b></div>
                      <div class="text-muted">{{ homework.to_date }}</div>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <br>
                <h2 id="lists">Instructions</h2>
                <ul>
                  <li>Instruction 1</li>
                  <li>Instruction 2 with Sub instruction:
                    <ul>
                      <li>Sub Instruction 1</li>
                    </ul>
                  </li>
                </ul>
                <br>

                <table class="table table-vcenter card-table table-striped">
                  <thead>
                  <tr>
                    <th>No.</th>
                    <th>Question</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(question, index) in homework.questions" :key="question._id">
                    <td>{{ index + 1 }}</td>
                    <td class="text-muted">{{ question }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-center"><em>Submissions 👇</em></h2>

    <div className="page-body">
      <div className="container-xl">
        <div className="col-12">
          <div className="card">
            <div className="table-responsive">
              <table class="table table-vcenter table-mobile-md card-table">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Info</th>
                  <th>Submitted On</th>
                  <th class="w-1">Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(answer, index) in answers" :key="index">
                  <td data-label="Name">
                    <div class="d-flex py-1 align-items-center">
                      <div class="flex-fill">
                        <div class="font-weight-medium">{{ answer.student ? answer.student.first_name : '' }}</div>
                        <div class="text-muted"><a href="#"
                                                   class="text-reset">{{ answer.student ? answer.student.last_name : '' }}</a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Info">
                    <div>{{ answer.student ? answer.student.roll_number : '' }}</div>
                    <div class="text-muted">{{ answer.student ? answer.student.registration_number : '' }}</div>
                  </td>
                  <td data-label="Submitted On">
                    <div>{{ answer.date }}</div>
                    <div class="text-muted">{{ answer.time }}</div>
                  </td>
                  <td>
                    <div class="btn-list flex-nowrap">
                      <a :href="answer.answer" class="btn btn-outline-primary" @click.prevent="viewAnswer(answer)">
                        View
                      </a>
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

</template>
