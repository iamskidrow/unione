const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    profile_status: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    gender: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
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
    school: {
        type: String,
        required: true,
        min: 2,
        max: 10,
    },
    designation: {
        type: String,
        required: true,
        min: 2,
        max: 10,
    },
    department: {
        type: String,
        required: true,
        min: 2,
        max: 10,
    },
    employee_number: {
        type: String,
        required: true,
        min: 6,
        max: 30,
        unique: true
    },
    registration_number: {
        type: String,
        required: true,
        min: 6,
        max: 30,
        unique: true
    },
    university_email: {
        type: String,
        required: true,
    },
    subjects: {
        type: String,
        required: true,
        min: 1,
        max: 10,
    },
    joining_date: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('Teacher', teacherSchema)
