const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    profile_status: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
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
    date_of_birth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
        min: 2,
        max: 25,
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
    department: {
        type: String,
        required: true,
        min: 2,
        max: 10,
    },
    roll_number: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        unique: true,
    },
    registration_number: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        unique: true,
    },
    course: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    course_id: {
        type: String,
        required: true,
        min: 2,
    },
    current_semester: {
        type: Number,
    },
    current_year: {
        type: Number,
    },
    session: {
        type: String,
        required: true,
    },
    university_email: {
        type: String,
        required: true,
    },
    admission_date: {
        type: Date,
        required: true,
    },
    father: {
        name: String,
        phone: String,
        email: String,
        occupation: String,
    },
    mother: {
        name: String,
        phone: String,
        email: String,
        occupation: String,
    },
})

module.exports = mongoose.model('Student', studentSchema)