// Import the required modules
const express = require("express");
const router = express.Router();
require('mongoose');
// Import the Homework model
const Homework = require("../model/Homework");

// Route to create a new homework
router.post("/homework", async (req, res) => {
    try {
        const {course_id, semester, subject, title, from_date, to_date, questions, assigned_by} = req.body;

        // Create a new homework
        const homework = new Homework({
            course_id,
            semester,
            subject,
            title,
            from_date,
            to_date,
            assigned_by,
            questions
        });

        // Save the homework to the database
        await homework.save();

        res.status(201).json({message: "Homework created successfully"});
    } catch (error) {
        res.status(500).send(error)
    }
});

// Route to submit a student's answer to a homework
router.post('/homework/:id', async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id);
        if (!homework) return res.status(404).json({message: 'Homework not found'});

        const {student, answer, date, time} = req.body;

        // Add the student's answer to the answers array with submitted date and time
        homework.answers.push({
            student,
            answer,
            date,
            time
        });
        await homework.save();

        res.status(201).json({message: 'Answer submitted successfully'});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to get all the answers of a homework
router.get("/homework/:homeworkId/answers", async (req, res) => {
    try {
        // Find the homework by ID
        const homework = await Homework.findById(req.params.homeworkId);
        if (!homework) return res.status(404).json({message: "Homework not found"});

        // Return the answers array for the homework
        res.status(200).json({answers: homework.answers});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});


// Route to get answers of a homework submitted by a student
router.get('/homework/answers', async (req, res) => {
    try {
        const {homework_id, student_id} = req.query;
        const homework = await Homework.findById(homework_id);
        if (!homework) return res.status(404).json({message: 'Homework not found'});

        const answer = homework.answers.find(answer => answer.student.toString() === student_id);
        if (!answer) {
            return res.json({status: 'Pending'});
        } else {
            return res.json({status: 'Submitted', answer: answer.answer, time: answer.time, date: answer.date});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Route to get all the homeworks
router.get("/homeworks", async (req, res) => {
    try {
        const { course_id, semester, assigned_by } = req.query;
        let homeworkQuery = {};

        if (course_id) {
            homeworkQuery.course_id = course_id;
        }
        if (semester) {
            homeworkQuery.semester = semester;
        }
        if (assigned_by) {
            homeworkQuery.assigned_by = assigned_by;
        }

        const homeworks = await Homework.find(homeworkQuery);
        res.json(homeworks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single homework by ID
router.get('/homework/:id', async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id)
        if (!homework) return res.status(404).json({message: 'Homework not found'})
        res.json(homework)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Server Error'})
    }
})

// DELETE homework
router.delete('/homework/:id', async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id)
        if (!homework) return res.status(404).json({message: 'Homework not found'})
        await homework.deleteOne()
        res.json({message: 'Homework deleted successfully'})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router;
