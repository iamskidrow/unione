const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    phone: {
        type: String,
        required: true,
        min: 10,
        max: 10,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
})

module.exports = mongoose.model('Admin', adminSchema)