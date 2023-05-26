import {createRouter, createWebHistory} from "vue-router";
import axios from 'axios';

// Admin components import
import AdminSelfProfile from "@/components/Admin/Profile.vue";
import AdminSettings from "@/components/Admin/Settings.vue";
import AdminDashboard from "@/components/Admin/Dashboard.vue";
import AdminCourses from "@/components/Admin/Courses.vue";
import AdminStudents from "@/components/Admin/Students.vue";
import StudentProfile from "@/components/Admin/StudentProfile.vue";
import AdminTeachers from "@/components/Admin/Teachers.vue";
import TeacherProfile from "@/components/Admin/TeacherProfile.vue";
import AdminNoticeboard from "@/components/Admin/Noticeboard.vue";
import AdminTimetable from "@/components/Admin/Timetable.vue";

// Teacher components import
import TeacherSelfProfile from "@/components/Teacher/Profile.vue";
import TeacherSettings from "@/components/Teacher/Settings.vue";
import TeacherAttendance from "@/components/Teacher/Attendance.vue";
import TeacherDashboard from "@/components/Teacher/Dashboard.vue";
import TeacherExams from "@/components/Teacher/Exams.vue";
import TeacherViewExam from "@/components/Teacher/ViewExam.vue";
import TeacherHomeworks from "@/components/Teacher/Homeworks.vue";
import TeacherViewHomework from "@/components/Teacher/ViewHomework.vue";
import TeacherNoticeboard from "@/components/Teacher/Noticeboard.vue";
import TeacherTimetable from "@/components/Teacher/Timetable.vue";

// Student components import
import StudentSelfProfile from "@/components/Student/Profile.vue";
import StudentSettings from "@/components/Student/Settings.vue";
import StudentAttendance from "@/components/Student/Attendance.vue";
import StudentCourse from "@/components/Student/Course.vue";
import StudentDashboard from "@/components/Student/Dashboard.vue";
import StudentExams from "@/components/Student/Exams.vue";
import StudentViewExam from "@/components/Student/ViewExam.vue";
import StudentHomeworks from "@/components/Student/Homeworks.vue";
import StudentViewHomework from "@/components/Student/ViewHomework.vue";
import StudentNoticeboard from "@/components/Student/Noticeboard.vue";
import StudentTimetable from "@/components/Student/Timetable.vue";

// Error components import
import AccessDenied from "@/components/Error/AccessDenied.vue";
import Maintenance from "@/components/Error/Maintenance.vue";
import NotFound from "@/components/Error/NotFound.vue";
import ServerError from "@/components/Error/ServerError.vue";

// Parent components import
import Main from "@/components/Main.vue";
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";
import Confirmation from "@/components/Confirmation.vue";

const routes = [

    // Parent routes
    {path: '/:pathMatch(.*)*', redirect: '/404'},
    {name: 'MainPage', path: '/', component: Main},
    {name: 'Login', path: '/login', component: Login},
    {name: 'Logout', path: '/logout', component: Logout},
    {name: 'ForgotPassword', path: '/forgot-password', component: ForgotPassword},
    {name: 'Confirmation', path: '/confirmation/', component: Confirmation},

    // Error routes
    {name: 'AccessDenied', path: '/403', component: AccessDenied},
    {name: 'NotFound', path: '/404', component: NotFound},
    {name: 'ServerError', path: '/500', component: ServerError},
    {name: 'Maintenance', path: '/503', component: Maintenance},

    // Admin routes
    {
        name: 'AdminSelfProfile',
        path: '/admin/profile',
        component: AdminSelfProfile,
        meta: {requiresAuth: true, requiredRoles: ['admin']}
    },
    {
        name: 'AdminSettings',
        path: '/admin/settings',
        component: AdminSettings,
        meta: {requiresAuth: true, requiredRoles: ['admin']}
    },
    {
        name: 'AdminDashboard',
        path: '/admin/',
        component: AdminDashboard,
        meta: {requiresAuth: true, requiredRoles: ['admin']}
    },
    {
        name: 'AdminCourses',
        path: '/admin/courses',
        component: AdminCourses,
        meta: {requiresAuth: true, requiredRoles: ['admin']}
    },
    {
        name: 'TeacherProfile',
        path: '/admin/teacher/:id',
        component: TeacherProfile
    },
    {
        name: 'AdminTeachers',
        path: '/admin/teachers',
        component: AdminTeachers,
        meta: {requiresAuth: true, requiredRoles: ['admin']}
    },
    {
        name: 'StudentProfile',
        path: '/admin/student/:id',
        component: StudentProfile
    },
    {
        name: 'AdminStudents',
        path: '/admin/students',
        component: AdminStudents,
        meta: {requiresAuth: true, requiredRoles: ['admin']}
    },
    {
        name: 'AdminNoticeboard',
        path: '/admin/noticeboard',
        component: AdminNoticeboard,
        meta: {requiresAuth: true, requiredRoles: ['admin']}
    },
    {
        name: 'AdminTimetable',
        path: '/admin/timetable',
        component: AdminTimetable,
        meta: {requiresAuth: true, requiredRoles: ['admin']}
    },

    // Teacher routes
    {
        name: 'TeacherSelfProfile',
        path: '/teacher/profile',
        component: TeacherSelfProfile,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },
    {
        name: 'TeacherSettings',
        path: '/teacher/settings',
        component: TeacherSettings,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },
    {
        name: 'TeacherDashboard',
        path: '/teacher/',
        component: TeacherDashboard,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },
    {
        name: 'TeacherHomeworks',
        path: '/teacher/homeworks',
        component: TeacherHomeworks,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },
    {
        name: 'TeacherViewHomework',
        path: '/teacher/homework/:id',
        component: TeacherViewHomework,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },
    {
        name: 'TeacherExams',
        path: '/teacher/exams',
        component: TeacherExams,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },
    {
        name: 'TeacherViewExam',
        path: '/teacher/exam/:id',
        component: TeacherViewExam,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },
    {
        name: 'TeacherAttendance',
        path: '/teacher/attendance',
        component: TeacherAttendance,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },
    {
        name: 'TeacherTimetable',
        path: '/teacher/timetable',
        component: TeacherTimetable,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },
    {
        name: 'TeacherNoticeboard',
        path: '/teacher/noticeboard',
        component: TeacherNoticeboard,
        meta: {requiresAuth: true, requiredRoles: ['teacher']}
    },

    // Student routes
    {
        name: 'StudentSelfProfile',
        path: '/student/profile',
        component: StudentSelfProfile,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentSettings',
        path: '/student/settings',
        component: StudentSettings,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentDashboard',
        path: '/student/',
        component: StudentDashboard,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentCourse',
        path: '/student/course',
        component: StudentCourse,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentHomeworks',
        path: '/student/homeworks',
        component: StudentHomeworks,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentViewHomework',
        path: '/student/homework/:id',
        component: StudentViewHomework,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentExams',
        path: '/student/exams',
        component: StudentExams,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentViewExam',
        path: '/student/exam/:id',
        component: StudentViewExam,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentAttendance',
        path: '/student/attendance',
        component: StudentAttendance,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentTimeTable',
        path: '/student/timetable',
        component: StudentTimetable,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
    {
        name: 'StudentNoticeboard',
        path: '/student/noticeboard',
        component: StudentNoticeboard,
        meta: {requiresAuth: true, requiredRoles: ['student']}
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Define a function to fetch the user's role and id from the API
async function getUserInfo() {
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
        console.error(error);
    }
}


// Use the getUserInfo function in a Vue.js route guard to restrict access to certain routes
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth) {
        const userInfo = await getUserInfo();
        if (userInfo) {
            const {_id, role} = userInfo;
            // Add the user's role and id to the Vue.js route object
            to.params.userInfo = {id: _id, role: role};

            // Check the user's role against the route's required roles
            const requiredRoles = to.meta.requiredRoles;
            if (!requiredRoles || requiredRoles.includes(role)) {
                next();
            } else {
                // Redirect to the home page if the user's role does not match the required role for the route
                // switch (role) {
                //     case 'admin':
                //         next('/admin');
                //         break;
                //     case 'teacher':
                //         next('/teacher');
                //         break;
                //     case 'student':
                //         next('/student');
                //         break;
                //     default:
                //         next('/');
                //         break;
                // }
                next('/404');
            }
        } else {
            // Redirect to the login page if the user is not authenticated
            next('/login');
        }
    } else {
        next();
    }
});


export default router;