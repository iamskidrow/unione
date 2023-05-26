const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    semester: {
        type: Number,
        required: true,
        min: 1
    },
    day: {
        type: Map,
        of: [
            {
                type: String
            }
        ],
        enum: [
            '', 'class1', 'class2', 'class3', 'class4', 'class5', 'class6', 'class7', 'class8'
        ],
        default: new Map([
            ['Monday', ['', '', '', '', '', '', '', '']],
            ['Tuesday', ['', '', '', '', '', '', '', '']],
            ['Wednesday', ['', '', '', '', '', '', '', '']],
            ['Thursday', ['', '', '', '', '', '', '', '']],
            ['Friday', ['', '', '', '', '', '', '', '']]
        ])
    }
});

module.exports = mongoose.model('Timetable', timetableSchema);
