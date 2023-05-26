const router = require('express').Router();
const Student = require('../../model/Student');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const verifyToken = require('../verify_token');
const {studentRegistration, loginValidation} = require('../../validation')

// Student Registration
router.post('/student', async (req, res) => {

    // Validation
    const {error} = studentRegistration(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Checking for duplicate
    const emailExists = await Student.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send('Email already Exists')

    // Password Hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create new student
    const user = new Student({
        profile_status: req.body.profile_status,
        avatar_url: req.body.avatar_url,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        gender: req.body.gender,
        religion: req.body.religion,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        school: req.body.school,
        department: req.body.department,
        roll_number: req.body.roll_number,
        registration_number: req.body.registration_number,
        course: req.body.course,
        course_id: req.body.course_id,
        current_semester: req.body.current_semester,
        current_year: req.body.current_year,
        session: req.body.session,
        university_email: req.body.university_email,
        admission_date: req.body.admission_date,
        father: {
            name: req.body.father.name,
            phone: req.body.father.phone,
            email: req.body.father.email,
            occupation: req.body.father.occupation,
        },
        mother: {
            name: req.body.father.name,
            phone: req.body.father.phone,
            email: req.body.father.email,
            occupation: req.body.father.occupation,
        }
    })
    try {
        await user.save();
        res.send({user: user._id})
    } catch (err) {
        res.status(400).send(err)
    }
})

// Change Password
router.post('/student/change-password', verifyToken, async (req, res) => {
    try {
        const {student_id, old_password, new_password, confirm_new_password} = req.body;

        // Find the current student
        const student = await Student.findById(student_id);
        if (!student) {
            return res.status(404).send('Student not found');
        }

        // Check if the old password is correct
        const validPassword = await bcrypt.compare(old_password, student.password);
        if (!validPassword) {
            return res.status(400).send('Incorrect old password');
        }

        // Check if the new password and confirm new password match
        if (new_password !== confirm_new_password) {
            return res.status(400).send('New password and confirm new password do not match');
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);

        // Update the student's password
        student.password = await bcrypt.hash(new_password, salt);
        await student.save();

        res.status(200).send('Password changed successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Student Login
router.post('/login/student', async (req, res) => {

    // Validation
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Checking for duplicate
    const user = await Student.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Incorrect Email!')

    // Checking for password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Incorrect Password!')

    // Create and assign a token
    const token = jwt.sign({_id: user._id, role: "student"}, process.env.TOKEN_SECRET)

    // set HttpOnly cookie with JWT token
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        // secure: process.env.NODE_ENV === 'production' // only send over HTTPS in production
    });

    // send success response
    res.status(200).json({message: 'Logged in successfully!'});
})


// Get single student information using id
router.get('/student/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById(id).exec();
        return res.json(student);
    } catch (err) {
        return res.status(500).send(err);
    }
});


// Get all students information
router.get('/students', async (req, res) => {
    try {
        const {course, course_id, current_semester, school, department, religion, gender} = req.query;

        // Build the filter object based on query parameters
        const filter = {};

        if (course) {
            filter.course = course;
        }

        if (course_id) {
            filter.course_id = course_id;
        }

        if (current_semester) {
            filter.current_semester = current_semester;
        }

        if (school) {
            filter.school = school;
        }

        if (department) {
            filter.department = department;
        }

        if (religion) {
            filter.religion = religion;
        }

        if (gender) {
            filter.gender = gender;
        }

        // Fetch students based on the filter
        const students = await Student.find(filter);
        return res.json(students);
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;