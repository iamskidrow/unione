# Student API

This API allows you to manage student-related operations.

## Student Registration

Register a new student.

- Route: `POST /student`
- Request Body:
    - `profile_status` (string): The profile status of the student.
    - `avatar_url` (string): The URL of the student's avatar.
    - `first_name` (string): The first name of the student.
    - `last_name` (string): The last name of the student.
    - `date_of_birth` (string): The date of birth of the student.
    - `gender` (string): The gender of the student.
    - `religion` (string): The religion of the student.
    - `address` (string): The address of the student.
    - `phone` (string): The phone number of the student.
    - `email` (string): The email address of the student.
    - `password` (string): The password of the student.
    - `school` (string): The school of the student.
    - `department` (string): The department of the student.
    - `roll_number` (string): The roll number of the student.
    - `registration_number` (string): The registration number of the student.
    - `course` (string): The course of the student.
    - `course_id` (string): The ID of the course.
    - `current_semester` (string): The current semester of the student.
    - `current_year` (string): The current year of the student.
    - `session` (string): The session of the student.
    - `university_email` (string): The university email address of the student.
    - `admission_date` (string): The admission date of the student.
    - `father` (object): The details of the student's father.
        - `name` (string): The name of the father.
        - `phone` (string): The phone number of the father.
        - `email` (string): The email address of the father.
        - `occupation` (string): The occupation of the father.
    - `mother` (object): The details of the student's mother.
        - `name` (string): The name of the mother.
        - `phone` (string): The phone number of the mother.
        - `email` (string): The email address of the mother.
        - `occupation` (string): The occupation of the mother.
- Response:
    - Status: `200 OK`
    - Body: `{ "user": "<student_id>" }`

## Change Password

Change the password of a student.

- Route: `POST /student/change-password`
- Request Body:
    - `student_id` (string): The ID of the student.
    - `old_password` (string): The old password of the student.
    - `new_password` (string): The new password of the student.
    - `confirm_new_password` (string): The confirmation of the new password.
- Response:
    - Status: `200 OK`
    - Body: `"Password changed successfully"`

## Student Login

Authenticate a student and generate a token.

- Route: `POST /login/student`
- Request Body:
    - `email` (string): The email address of the student.
    - `password` (string): The password of the student.
- Response:
    - Status: `200 OK`
    - Body: `{ "message": "Logged in successfully!" }`

## Get Single Student Information by ID

Retrieve information about a single student using the student ID.

- Route: `GET /student/:id`
- Parameters:
    - `id` (string): The ID of the student.
- Response:
    - Status: `200 OK`
    - Body: The student object.

## Get All Students Information

Retrieve information about all students based on optional query parameters.

- Route: `GET /students`
- Query Parameters (optional):
    - `course` (string): Filter students by course.
    - `course_id` (string): Filter students by course ID.
    - `current_semester` (string): Filter students by current semester.
    - `school` (string): Filter students by school.
    - `department` (string): Filter students by department.
    - `religion` (string): Filter students by religion.
    - `gender` (string): Filter students by gender.
- Response:
    - Status: `200 OK`
    - Body: An array of student objects.
