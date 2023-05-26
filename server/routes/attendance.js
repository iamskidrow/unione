const express = require('express');
const router = express.Router();
const Attendance = require('../model/attendance');

// GET attendance records by student_id, subject, date, and status
router.get('/attendances', async (req, res) => {
    try {
        const {course_id, semester, student_id, subject, date, status, teacher_id} = req.query;
        let attendanceQuery = {};

        if (course_id) {
            attendanceQuery.course_id = course_id;
        }
        if (semester) {
            attendanceQuery.semester = semester;
        }
        if (student_id) {
            attendanceQuery.student_id = student_id;
        }
        if (subject) {
            attendanceQuery.subject = subject;
        }
        if (date) {
            attendanceQuery.date = date;
        }
        if (status) {
            attendanceQuery.status = status;
        }
        if (teacher_id) {
            attendanceQuery.teacher_id = teacher_id;
        }

        const attendance = await Attendance.find(attendanceQuery);
        res.json(attendance);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET a single attendance record by ID
router.get('/attendance/:id', getAttendance, (req, res) => {
    res.json(res.attendance);
});

// CREATE a new attendance record
router.post('/attendance', async (req, res) => {
    const attendance = new Attendance({
        course_id: req.body.course_id,
        semester: req.body.semester,
        student_id: req.body.student_id,
        subject: req.body.subject,
        date: req.body.date,
        status: req.body.status,
        teacher_id: req.body.teacher_id
    });

    try {
        const newAttendance = await attendance.save();
        res.status(201).json(newAttendance);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// UPDATE an attendance record by ID
router.patch('/attendance/:id', getAttendance, async (req, res) => {
    if (req.body.course_id != null) {
        res.attendance.course_id = req.body.course_id;
    }
    if (req.body.semester != null) {
        res.attendance.semester = req.body.semester;
    }
    if (req.body.student_id != null) {
        res.attendance.student_id = req.body.student_id;
    }

    if (req.body.subject != null) {
        res.attendance.subject = req.body.subject;
    }

    if (req.body.date != null) {
        res.attendance.date = req.body.date;
    }

    if (req.body.status != null) {
        res.attendance.status = req.body.status;
    }
    if (req.body.teacher_id != null) {
        res.attendance.teacher_id = req.body.teacher_id;
    }

    try {
        const updatedAttendance = await res.attendance.save();
        res.json(updatedAttendance);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// DELETE an attendance record by ID
router.delete('/attendance/:id', getAttendance, async (req, res) => {
    try {
        await res.attendance.deleteOne();
        res.json({message: 'Attendance record deleted successfully'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Middleware function to get an attendance record by ID
async function getAttendance(req, res, next) {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (attendance == null) {
            return res.status(404).json({message: 'Attendance record not found'});
        }
        res.attendance = attendance;
        next();
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = router;
