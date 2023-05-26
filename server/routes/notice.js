const router = require('express').Router();
const Notice = require('../model/Notice');
const verify = require('./verify_token')

// Get all notices
router.get('/noticeboard', async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json(notices);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get a single notice
router.get('/noticeboard/:id', getNotice, (req, res) => {
    res.json(res.post);
});

// Create a notice
router.post('/noticeboard', async (req, res) => {
    const notice = new Notice({
        title: req.body.title,
        publisher: req.body.publisher,
        notice: req.body.notice,
        date: req.body.date
    });

    try {
        const newNotice = await notice.save();
        res.status(201).json(newNotice);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Update a notice
router.patch('/noticeboard/:id', getNotice, async (req, res) => {
    if (req.body.title != null) {
        res.post.title = req.body.title;
    }
    if (req.body.notice != null) {
        res.post.notice = req.body.notice;
    }
    if (req.body.publisher != null) {
        res.post.publisher = req.body.publisher;
    }
    if (req.body.date != null) {
        res.post.date = req.body.date;
    }

    try {
        const updatedNotice = await res.post.save();
        res.json(updatedNotice);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Delete a notice
router.delete('/noticeboard/:id', async (req, res) => {
    try {
        const result = await Notice.deleteOne({_id: req.params.id});
        if (result.deletedCount === 0) {
            return res.status(404).json({message: 'Post not found'});
        }
        res.json({message: 'Post deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


// Middleware to get a single notice by ID
async function getNotice(req, res, next) {
    try {
        const notice = await Notice.findById(req.params.id);
        if (notice == null) {
            return res.status(404).json({message: 'Cannot find notice'});
        }
        res.post = notice;
        next();
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = router;
