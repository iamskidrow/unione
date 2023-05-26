// Require necessary modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('jsonwebtoken');

// Require routes for authentication, homeworks, exams, notices, subjects, courses, and timetables
const admin_route = require('./routes/auth/admin');
const teacher_route = require('./routes/auth/teacher');
const student_route = require('./routes/auth/student');
const homework_route = require('./routes/homeworks');
const exam_route = require('./routes/exams');
const notice_route = require('./routes/notice');
const attendance_route = require('./routes/attendance');
const course_route = require('./routes/course');
const timetable_route = require('./routes/timetable');
const verify_token = require('./routes/verify_token');

// Create an express app
const app = express();

// Use cookie-parser and configure CORS
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow requests from these origins
    credentials: true // Allow credentials (cookies, authorization headers, etc.) to be included in requests
}));

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Use JSON middleware for parsing request bodies
app.use(express.json());

// Use routes for authentication, homeworks, exams, notices, subjects, courses, and timetables
app.use('/api/', admin_route);
app.use('/api/', teacher_route);
app.use('/api/', student_route);
app.use('/api/', notice_route);
app.use('/api/', homework_route);
app.use('/api/', exam_route);
app.use('/api/', timetable_route);
app.use('/api', attendance_route);
app.use('/api/', course_route);
app.use('/api/', verify_token);

// Start server on port 3000
app.listen(3000, () => {
    console.log("Server running at port 3000");
});
