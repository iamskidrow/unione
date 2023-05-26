<script>
import Navbar from "@/components/Student/Navbar.vue";
import axios from "axios";

export default {
    name: "Attendance",
    components: {Navbar},
    data() {
        return {
            profile: {},
            subjects: [],
            attendances: [],
            selectedCourse: null,
            selectedSemester: null,
            selectedSubject: null,
            totalClassesSum: 0,
            totalPresentsSum: 0,
            totalAbsentsSum: 0,
        };
    },
    async created() {
        const userInfo = await this.getUserInfo();
        const studentId = userInfo._id;

        axios
            .get(`http://localhost:3000/api/student/${studentId}`)
            .then((response) => {
                this.profile = response.data;
                this.selectedCourse = this.profile.course_id;
                this.selectedSemester = this.profile.current_semester;
                this.fetchSubjects();
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        async getUserInfo() {
            try {
                const token = localStorage.getItem("jwt");
                const response = await axios.get("http://localhost:3000/api/check_token", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true, // This is required for sending cookies in cross-site requests
                });
                return response.data;
            } catch (error) {
                console.error(error);
                return {};
            }
        },
        async fetchSubjects() {
            try {
                const response = await axios.get(`http://localhost:3000/api/course/${this.selectedCourse}`);
                const subjects = response.data.subjects;
                const selectedSemesterSubjects = subjects.find((subject) => subject.semester === this.selectedSemester);
                this.subjects = selectedSemesterSubjects.subject_names;
                await this.fetchAttendance();
            } catch (error) {
                console.error(error);
            }
        },
        async fetchAttendance() {
            try {
                const studentId = this.profile._id;
                const attendancePromises = this.subjects.map((subject) =>
                    axios.get(`http://localhost:3000/api/attendances?student_id=${studentId}&subject=${subject}`)
                );
                const attendanceResponses = await Promise.all(attendancePromises);
                this.attendances = attendanceResponses.map((response) => response.data);

                // Calculate and log the total, present, and absent classes
                this.totalClassesSum = this.subjects.reduce((sum, subject) => sum + this.getTotalClasses(subject), 0);
                this.totalPresentsSum = this.subjects.reduce((sum, subject) => sum + this.getTotalPresents(subject), 0);
                this.totalAbsentsSum = this.subjects.reduce((sum, subject) => sum + this.getTotalAbsents(subject), 0);

            } catch (error) {
                console.error(error);
            }
        },
        getTotalClasses(subject) {
            const attendance = this.attendances.find((attendance) => attendance[0].subject === subject);
            return attendance ? attendance.length : 0;
        },
        getTotalPresents(subject) {
            const attendance = this.attendances.find((attendance) => attendance[0].subject === subject);
            if (!attendance) return 0;
            return attendance.filter((record) => record.status === "Present").length;
        },
        getTotalAbsents(subject) {
            const attendance = this.attendances.find((attendance) => attendance[0].subject === subject);
            if (!attendance) return 0;
            return attendance.filter((record) => record.status === "Absent").length;
        },
        getAttendancePercentage(subject) {
            const totalClasses = this.getTotalClasses(subject);
            const totalPresents = this.getTotalPresents(subject);
            const attendancePercentage = Math.round(totalPresents / totalClasses * 100);
            return isNaN(attendancePercentage) ? 0 : attendancePercentage;
        },
        getAttendanceStatus(subject) {
            const attendancePercentage = this.getAttendancePercentage(subject);
            if (attendancePercentage >= 75) return "Good";
            if (attendancePercentage >= 50) return "Average";
            return "Bad";
        },
    },
};
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
                </div>
            </div>
        </div>

        <div class="page-wrapper">
            <div class="page-body">
                <div class="container-xl">
                    <div class="col-12">
                        <div class="row row-cards">
                            <div class="col-sm-6 col-lg-3">
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                            <span class="bg-primary text-white avatar">
                              <svg xmlns="http://www.w3.org/2000/svg"
                                   class="icon icon-tabler icon-tabler-report-analytics" width="24" height="24"
                                   viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                   stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
   <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
   <path d="M9 17v-5"></path>
   <path d="M12 17v-1"></path>
   <path d="M15 17v-3"></path>
</svg>
                            </span>
                                            </div>
                                            <div class="col">
                                                <div class="font-weight-medium">
                                                    Total Lectures
                                                </div>
                                                <div class="text-muted">
                                                    {{ totalClassesSum }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                            <span class="bg-success text-white avatar">
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-up" width="24" height="24"
     viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
     stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
</svg>
                            </span>
                                            </div>
                                            <div class="col">
                                                <div class="font-weight-medium">
                                                    Present
                                                </div>
                                                <div class="text-muted">
                                                    {{ totalPresentsSum }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                            <span class="bg-danger text-white avatar">
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-down"
                                   width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                   fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
</svg>
                            </span>
                                            </div>
                                            <div class="col">
                                                <div class="font-weight-medium">
                                                    Absent
                                                </div>
                                                <div class="text-muted">
                                                    {{ totalAbsentsSum }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                            <span class="bg-info text-white avatar">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-percentage"
                                     width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                     fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M17 17m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
   <path d="M7 7m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
   <path d="M6 18l12 -12"></path>
</svg>
                            </span>
                                            </div>
                                            <div class="col">
                                                <div class="font-weight-medium">
                                                    Attendance
                                                </div>
                                                <div class="text-muted">
                                                    {{ Math.round((totalPresentsSum / totalClassesSum) * 100) }}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br>

                    <div class="card">
                        <div class="card-body">
                            <div id="table-default" class="table-responsive">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <button class="table-sort" data-sort="sort-subject">Subject</button>
                                        </th>
                                        <th>
                                            <button class="table-sort" data-sort="sort-total">Total</button>
                                        </th>
                                        <th>
                                            <button class="table-sort" data-sort="sort-present">Present</button>
                                        </th>
                                        <th>
                                            <button class="table-sort" data-sort="sort-absent">Absent</button>
                                        </th>
                                        <th>
                                            <button class="table-sort" data-sort="sort-total">Percentage</button>
                                        </th>
                                        <th>
                                            <button class="table-sort" data-sort="sort-status">Status</button>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(subject, index) in subjects" :key="index">
                                        <td>{{ subject }}</td>
                                        <td>{{ getTotalClasses(subject) }}</td>
                                        <td>{{ getTotalPresents(subject) }}</td>
                                        <td>{{ getTotalAbsents(subject) }}</td>
                                        <td>
                                            <div className="row align-items-center">
                                                <div className="col-12 col-lg-auto">{{
                                                    getAttendancePercentage(subject)
                                                    }}%
                                                </div>
                                                <div className="col">
                                                    <div className="progress" style="width: 5rem">
                                                        <div className="progress-bar"
                                                             :style="{ width: `${getAttendancePercentage(subject)}%` }"
                                                             role="progressbar" aria-valuenow="30"
                                                             aria-valuemin="0" aria-valuemax="100"
                                                             aria-label="{{ getAttendancePercentage(subject) }}% Complete">
                                                            <span className="visually-hidden">{{
                                                                getAttendancePercentage(subject)
                                                                }}% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="w-1 sort-status">{{ getAttendanceStatus(subject) }}</td>
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

