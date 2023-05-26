// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Exam model
const Exam = require("../model/Exam");

// Route to create a new exam
router.post("/exam", async (req, res) => {
    try {
        // Destructure the required attributes from the request body
        const {
            course_id,
            semester,
            exam_name,
            subject,
            marks,
            date,
            start_time,
            end_time,
            posted_by,
            questions
        } = req.body;

        // Create a new exam instance
        const exam = new Exam({
            course_id,
            semester,
            exam_name,
            subject,
            marks,
            date,
            start_time,
            end_time,
            posted_by,
            questions,
        });

        // Save the exam to the database
        await exam.save();

        res.status(201).json({message: "Exam created successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to submit a student's answer to an exam
router.post('/exam/:id', async (req, res) => {
    try {
        // Find the exam by ID
        const exam = await Exam.findById(req.params.id);
        if (!exam) return res.status(404).json({message: 'Exam not found'});

        // Destructure the required attributes from the request body
        const {student, answer, date, time} = req.body;

        // Add the student's answer to the answers array with submitted date and time
        exam.answers.push({
            student,
            answer,
            date,
            time
        });
        await exam.save();

        res.status(201).json({message: 'Answer submitted successfully'});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to get all the answers of an exam
router.get("/exam/:examId/answers", async (req, res) => {
    try {
        // Find the exam by ID
        const exam = await Exam.findById(req.params.examId);
        if (!exam) return res.status(404).json({message: "Exam not found"});

        // Return the answers array for the exam
        res.status(200).json({answers: exam.answers});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

// Route to get answers of an exam submitted by a student
router.get('/exams/answers', async (req, res) => {
    try {
        // Destructure the required query parameters
        const {exam_id, student_id} = req.query;

        // Find the exam by ID
        const exam = await Exam.findById(exam_id);
        if (!exam) return res.status(404).json({message: 'Exam not found'});

        // Find the answer submitted by the student
        const answer = exam.answers.find(answer => answer.student.toString() === student_id);
        if (!answer) {
            // If the student has not submitted the answer yet
            return res.json({status: 'Pending'});
        } else {
            // If the student has already submitted the answer
            return res.json({status: 'Submitted', answer: answer.answer, time: answer.time, date: answer.date});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Route to get all the exams
router.get("/exams", async (req, res) => {
    try {
        const {course_id, semester, subject, posted_by} = req.query;
        let examQuery = {};

        if (course_id) {
            examQuery.course_id = course_id;
        }
        if (semester) {
            examQuery.semester = semester;
        }
        if (subject) {
            examQuery.subject = subject;
        }
        if (posted_by) {
            examQuery.posted_by = posted_by;
        }

        const exams = await Exam.find(examQuery);
        res.status(200).json(exams);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

// Route to get a single exam by ID
router.get('/exam/:id', async (req, res) => {
    try {
        // Find the exam by ID
        const exam = await Exam.findById(req.params.id);

        // If exam is not found, return a 404 error response with message
        if (!exam) return res.status(404).json({message: 'Exam not found'});

        // Otherwise, return the exam data as a JSON response
        res.json(exam);
    } catch (error) {
        // If there is an error, log it to console and return a 500 error response with message
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Add a result to an exam
router.post('/result', async (req, res) => {
    try {
        const {exam_id, student_id, marks} = req.body;

        const exam = await Exam.findById(exam_id);
        if (!exam) {
            return res.status(404).json({message: 'Exam not found'});
        }

        const newResult = {
            student_id,
            marks,
        };

        exam.results.push(newResult);
        await exam.save();

        return res.status(201).json({message: 'Result added successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Get a single result by ID
router.get('/result/:id', async (req, res) => {
    try {
        const result = await Exam.findOne({'results._id': req.params.id}, {'results.$': 1});
        if (!result) {
            return res.status(404).json({message: 'Result not found'});
        }
        return res.json(result.results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

// Get all the results of an exam
router.get('/results/:exam_id', async (req, res) => {
    try {
        const { exam_id } = req.params;
        const { student_id } = req.query;

        const exam = await Exam.findById(exam_id);

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        let filteredResults = exam.results;

        if (student_id) {
            filteredResults = filteredResults.filter(result => result.student_id.toString() === student_id);
        }

        return res.json(filteredResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Route to delete an exam by ID
router.delete('/exam/:id', async (req, res) => {
    try {
        // Find the exam by ID and delete it
        const exam = await Exam.findByIdAndDelete(req.params.id);

        // If exam is not found, return a 404 error response with message
        if (!exam) return res.status(404).json({message: 'Exam not found'});

        // Otherwise, return a success message as a JSON response
        res.json({message: 'Exam deleted successfully'});
    } catch (error) {
        // If there is an error, log it to console and return a 500 error response with message
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});


module.exports = router;
