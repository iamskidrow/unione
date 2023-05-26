const router = require('express').Router();
const Admin = require('../../model/Admin');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
// const verifyToken = require('../verifyToken');
const {adminRegistration, loginValidation} = require('../../validation')


// Admin Registration
router.post('/admin', async (req, res) => {

    // Validation
    const {error} = adminRegistration(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Checking for duplicate
    const emailExists = await Admin.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send('Email already Exists')

    // Password Hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create new user
    const user = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
    })
    try {
        await user.save();
        res.send({user: user._id})
    } catch (err) {
        res.status(400).send(err)
    }
})

// User Login
router.post('/login/admin', async (req, res) => {

    // Validation
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Checking for duplicate
    const user = await Admin.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Incorrect Email')

    // Checking for password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Incorrect Password')

    // Create and assign a token
    const token = jwt.sign({_id: user._id, role: "admin"}, process.env.TOKEN_SECRET)

    // Set HTTP-only cookie with JWT token
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        // secure: process.env.NODE_ENV === 'production' // only send over HTTPS in production
    });

    // Send success response
    res.status(200).json({message: 'Logged in successfully!'});

})

// Get single student information using id
router.get('/admin/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const admin = await Admin.findById(id).exec();
        return res.json(admin);
    } catch (err) {
        return res.status(500).send(err);
    }
});


// Get all students information
router.get('/admins', async (req, res) => {
    try {
        const admins = await Admin.find({});
        return res.json(admins);
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;