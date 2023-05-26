const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    total_semesters: {
        type: Number,
        required: true
    },
    subjects: [{
        semester: {
            type: Number,
            required: true
        },
        subject_names: [{
            type: String,
            required: true
        }]
    }]
});

module.exports = mongoose.model('Course', courseSchema);
