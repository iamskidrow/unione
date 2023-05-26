const Joi = require('joi')
const adminRegistration = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        phone: Joi.string().min(9).max(11).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data)
}

const teacherRegistration = data => {
    const schema = Joi.object({
        profile_status: Joi.string().required(),
        avatar_url: Joi.string().required(),
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        date_of_birth: Joi.date().required(),
        gender: Joi.string().required(),
        address: Joi.object().required(),
        phone: Joi.string().min(9).max(11).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required(),
        school: Joi.string().min(2).required(),
        department: Joi.string().min(2).required(),
        designation: Joi.string().min(2).required(),
        employee_number: Joi.string().min(5).required(),
        registration_number: Joi.string().min(5).required(),
        subjects: Joi.string().required(),
        university_email: Joi.string().min(5).required().email(),
        joining_date: Joi.date().required(),
    })
    return schema.validate(data)
}

const studentRegistration = data => {
    const schema = Joi.object({
        profile_status: Joi.string().required(),
        avatar_url: Joi.string(),
        first_name: Joi.string().min(2).required(),
        last_name: Joi.string().min(2).required(),
        date_of_birth: Joi.date().required(),
        gender: Joi.string().required(),
        religion: Joi.string().min(2).required(),
        address: Joi.object().required(),
        phone: Joi.string().min(9).max(11).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required(),
        school: Joi.string().min(2).required(),
        department: Joi.string().min(2).required(),
        roll_number: Joi.string().min(5).required(),
        registration_number: Joi.string().min(5).required(),
        course: Joi.string().min(2).required(),
        course_id: Joi.string().min(5).required(),
        current_semester: Joi.number().min(1),
        current_year: Joi.number().min(1),
        session: Joi.string().min(2).required(),
        university_email: Joi.string().min(5).required().email(),
        admission_date: Joi.date().required(),
        father: Joi.object().required(),
        mother: Joi.object().required(),
    })
    return schema.validate(data)
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports.adminRegistration = adminRegistration;
module.exports.teacherRegistration = teacherRegistration;
module.exports.studentRegistration = studentRegistration;
module.exports.loginValidation = loginValidation;