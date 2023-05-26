<script>
import Navbar from "@/components/Student/Navbar.vue";
import axios from "axios";

export default {
  name: "ViewExam",
  components: {Navbar},
  data() {
    return {
      profile: {},
      exam: {},
      course: {},
      answer: '',
      marks: null,
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

    const examId = this.$route.params.id;
    axios.get(`http://localhost:3000/api/exam/${examId}`)
        .then(response => {
          this.exam = response.data;
          const courseId = this.exam.course_id;
          axios.get(`http://localhost:3000/api/course/${courseId}`)
              .then(response => {
                this.course = response.data;
              })
              .catch(error => {
                console.log(error);
              });
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    printDiv() {
      let printContents = this.$refs.print_exam.innerHTML;
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
    // Fetch marks by exam_id and student_id
    async fetchMarks() {
      try {
        const examId = this.$route.params.id;
        const userInfo = await this.getUserInfo();
        const studentId = userInfo._id;

        const response = await fetch(`http://localhost:3000/api/results/${examId}?student_id=${studentId}`);
        const results = await response.json();

        if (results.length > 0) {
          // Marks found, return the marks value
          return results[0].marks;
        } else {
          // No result found
          return null;
        }
      } catch (error) {
        console.error(error);
        // Handle error
        return null;
      }
    },
    async submitAnswer() {
      const examId = this.$route.params.id;
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      const timeOptions = {hour: '2-digit', minute: '2-digit'};
      const timeString = today.toLocaleTimeString('en-US', timeOptions);
      try {
        await axios.post(`http://localhost:3000/api/exam/${examId}`, {
          student: this.profile._id,
          answer: this.answer,
          date: `${dd}/${mm}/${yyyy}`,
          time: timeString,
        });
        console.log('Answer submitted successfully!');
        this.$router.push('/student/exams');
      } catch (error) {
        console.error(error);
      }
      // console.log(timeString)
    },
  },
  computed: {
    isDisabled() {
      return !(this.answer);
    }
  },
  mounted() {
    this.fetchMarks()
        .then((marks) => {
          if (marks !== null) {
            // Marks found, update the marks data property
            this.marks = marks;
          } else {
            // No marks found for the given examId and studentId
            console.log('No marks found');
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
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
              Exam
            </div>
            <h2 class="page-title">
              Welcome, {{ profile.first_name }} 👋
            </h2>
          </div>
          <div class="col-12 col-md-auto ms-auto d-print-none">
            <div class="btn-list">
              <button type="button" class="btn btn-ghost-secondary" data-bs-toggle="modal"
                      data-bs-target="#modal-small">
                View Result
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
                Print Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-body" ref="print_exam">
      <div class="container-xl">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-9">
            <div class="card card-lg">
              <div class="card-body markdown">

                <div class="text-center mb-4">
                  <a href="#"
                     class="navbar-brand navbar-brand-autodark"><img
                      src="/src/assets/static/logo.png" alt="" height="45"></a>
                </div>

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
                        {{ course.name + ',' + exam.semester }}
                      </div>
                    </td>
                    <td class="text-center w-50">
                      <div><b>Subject</b></div>
                      <div class="text-muted">{{ exam.subject }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center w-50">
                      <div><b>Exam Name</b></div>
                      <div class="text-muted">{{ exam.exam_name }}</div>
                    </td>
                    <td class="text-center w-50">
                      <div><b>Total Marks</b></div>
                      <div class="text-muted">{{ exam.marks }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center w-50">
                      <div><b>Start Time</b></div>
                      <div class="text-muted">{{ exam.start_time }}</div>
                    </td>
                    <td class="text-center w-50">
                      <div><b>End Time</b></div>
                      <div class="text-muted">{{ exam.end_time }}</div>
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
                  <tr v-for="(question, index) in exam.questions" :key="question._id">
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

    <h2 class="text-center"><em>Submit answer 👇</em></h2>

    <div class="page-body" ref="print_exam">
      <div class="container-xl">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-9">
            <div class="card card-lg">
              <div className="table-responsive">
                <table className="table table-vcenter table-mobile-md card-table">
                  <thead>
                  <tr>
                    <th class="text-center">Answer</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td data-label="Answer" class="text-center">
                      <div class="input-group mb-auto">
                        <input type="text" class="form-control" placeholder="Enter answer url.."
                               v-model="answer">
                        <button class="btn btn-outline-success" type="button"
                                @click="submitAnswer" :disabled="isDisabled">Submit
                        </button>
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

    <div class="modal modal-blur fade" id="modal-small" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="modal-title">CONGRATULATIONS!! 🎉</div>
            <div>You got <strong><u>{{ marks }}</u></strong> out of <strong>{{ exam.marks }}</strong>.</div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
