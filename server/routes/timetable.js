const express = require('express');
const router = express.Router();
const Timetable = require('../model/Timetable');

// Add a new timetable
router.post('/timetable/', async (req, res) => {
    try {
        const {course_id, semester, day} = req.body;
        const timetable = new Timetable({course_id, semester, day});
        await timetable.save();
        return res.json(timetable);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Server error'});
    }
});

// Get timetable by course_id and semester
router.get('/timetable/:courseId/:semester', async (req, res) => {
    try {
        const {courseId, semester} = req.params;
        const timetable = await Timetable.findOne({course_id: courseId, semester});
        if (!timetable) {
            return res.status(404).json({error: 'Timetable not found'});
        }
        return res.json(timetable);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Server error'});
    }
});

// Get timetable of all semesters by course ID
router.get('/timetables/:courseId', async (req, res) => {
    try {
        const {courseId} = req.params;
        const timetables = await Timetable.find({course_id: courseId});
        if (timetables.length === 0) {
            return res.status(404).json({error: 'Timetable not found'});
        }
        return res.json(timetables);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Server error'});
    }
});

// Update timetable by course ID and semester
router.put('/timetable/:courseId/:semester', async (req, res) => {
    try {
        const {courseId, semester} = req.params;
        const {day} = req.body;
        const timetable = await Timetable.findOneAndUpdate(
            {course_id: courseId, semester},
            {day},
            {new: true}
        );
        if (!timetable) {
            return res.status(404).json({error: 'Timetable not found'});
        }
        return res.json(timetable);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Server error'});
    }
});

// Delete a timetable
router.delete('/timetable/:courseId/:semester', async (req, res) => {
    try {
        const {courseId, semester} = req.params;
        const timetable = await Timetable.findOneAndDelete({course_id: courseId, semester});
        if (!timetable) {
            return res.status(404).json({error: 'Timetable not found'});
        }
        return res.json({message: 'Timetable deleted successfully'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Server error'});
    }
});

module.exports = router;
