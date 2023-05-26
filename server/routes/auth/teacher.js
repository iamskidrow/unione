const router = require('express').Router();
const Teacher = require('../../model/Teacher');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const verifyToken = require('../verify_token');
const {teacherRegistration, loginValidation} = require('../../validation')

// Teacher Registration
router.post('/teacher', async (req, res) => {

    // Validation
    const {error} = teacherRegistration(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Checking for duplicate
    const emailExists = await Teacher.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send('Email already Exists')

    // Password Hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create new user
    const user = new Teacher({
        profile_status: req.body.profile_status,
        avatar_url: req.body.avatar_url,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        department: req.body.department,
        school: req.body.school,
        employee_number: req.body.employee_number,
        registration_number: req.body.registration_number,
        subjects: req.body.subjects,
        designation: req.body.designation,
        university_email: req.body.university_email,
        joining_date: req.body.joining_date,
    })
    try {
        await user.save();
        res.send({user: user._id})
    } catch (err) {
        res.status(400).send(err)
    }
})

// Change Password
router.post('/teacher/change-password', verifyToken, async (req, res) => {
    try {
        const { teacher_id, old_password, new_password, confirm_new_password } = req.body;

        // Find the current teacher
        const teacher = await Teacher.findById(teacher_id);
        if (!teacher) {
            return res.status(404).send('Teacher not found');
        }

        // Check if the old password is correct
        const validPassword = await bcrypt.compare(old_password, teacher.password);
        if (!validPassword) {
            return res.status(400).send('Incorrect old password');
        }

        // Check if the new password and confirm new password match
        if (new_password !== confirm_new_password) {
            return res.status(400).send('New password and confirm new password do not match');
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);

        // Update the teacher's password
        teacher.password = await bcrypt.hash(new_password, salt);
        await teacher.save();

        res.status(200).send('Password changed successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

// User Login
router.post('/login/teacher', async (req, res) => {

    // Validation
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Checking for duplicate
    const user = await Teacher.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Incorrect Email')

    // Checking for password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Incorrect Password')

    // Create and assign a token
    const token = jwt.sign({_id: user._id, role: "teacher"}, process.env.TOKEN_SECRET)

    // Send token as a cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        // secure: process.env.NODE_ENV === 'production' // only send over HTTPS in production
    });

    res.status(200).json({message: 'Logged in successfully!'});

})

// Get single teacher information using id
router.get('/teacher/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const teacher = await Teacher.findById(id).exec();
        return res.json(teacher);
    } catch (err) {
        return res.status(500).send(err);
    }
});


// Get all teachers information
router.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        return res.json(teachers);
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;