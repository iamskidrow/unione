const mongoose = require('mongoose');

const {Schema} = mongoose;

const examSchema = new Schema({
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    exam_name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    start_time: {
        type: String,
        required: true,
    },
    end_time: {
        type: String,
        required: true,
    },
    posted_by: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    questions: [
        {
            type: String,
            required: true,
        },
    ],
    answers: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true,
            },
            answer: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                required: true,
            },
            time: {
                type: String,
                required: true,
            },
        },
    ],
    results: [
        {
            student_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
                required: true,
            },
            marks: {
                type: Number,
                required: true,
            },
        },
    ],
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
