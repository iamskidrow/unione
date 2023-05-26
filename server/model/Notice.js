const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3
    },
    publisher: {
        type: String,
        required: true,
    },
    notice: {
        type: String,
        required: true,
        min: 16
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Notice', noticeSchema);