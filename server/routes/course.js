const router = require('express').Router();
const Course = require('../model/Course');
// const verify = require('./verifyToken')

// Get all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single course
router.get('/course/:id', getCourse, (req, res) => {
    res.json(res.course);
});

// Create a course
router.post('/course', async (req, res) => {
    const course = new Course({
        name: req.body.name,
        description: req.body.description,
        school: req.body.school,
        department: req.body.department,
        total_semesters: req.body.total_semesters,
        semester: req.body.semester,
        subjects: req.body.subjects
    });

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a course
router.patch('/course/:id', getCourse, async (req, res) => {
    if (req.body.name != null) {
        res.course.name = req.body.name;
    }
    if (req.body.description != null) {
        res.course.description = req.body.description;
    }
    if (req.body.school != null) {
        res.course.school = req.body.school;
    }
    if (req.body.department != null) {
        res.course.department = req.body.department;
    }
    if (req.body.total_semesters != null) {
        res.course.total_semesters = req.body.total_semesters;
    }
    if (req.body.semester != null) {
        res.course.semester = req.body.semester;
    }
    if (req.body.subjects != null) {
        res.course.subjects = req.body.subjects;
    }

    try {
        const updatedCourse = await res.course.save();
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a course
router.delete('/course/:id', getCourse, async (req, res) => {
    try {
        await res.course.deleteOne();
        res.json({ message: 'Course has been deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a single course by id
async function getCourse(req, res, next) {
    let course;
    try {
        course = await Course.findById(req.params.id);
        if (course == null) {
            return res.status(404).json({ message: 'Cannot find course' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.course = course;
    next();
}

module.exports = router;
