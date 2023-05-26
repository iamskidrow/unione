const mongoose = require('mongoose');

const HomeworkSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    from_date: {
        type: String,
        required: true
    },
    to_date: {
        type: String,
        required: true
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    questions: [
        {
            type: String,
            required: true
        }
    ],
    answers: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            },
            answer: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        }
    ]

});

const Homework = mongoose.model('Homework', HomeworkSchema);

module.exports = Homework;
