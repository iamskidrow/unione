# Teacher API

This API allows you to manage teacher-related operations.

## Base URL

The base URL for all endpoints is: `/api`

## Teacher Registration

Register a new teacher.

- Route: `POST /teacher`
- Request Body:
    - `profile_status` (string): The profile status of the teacher.
    - `avatar_url` (string): The URL of the teacher's avatar.
    - `first_name` (string): The first name of the teacher.
    - `last_name` (string): The last name of the teacher.
    - `gender` (string): The gender of the teacher.
    - `date_of_birth` (string): The date of birth of the teacher.
    - `address` (string): The address of the teacher.
    - `phone` (string): The phone number of the teacher.
    - `email` (string): The email address of the teacher.
    - `password` (string): The password of the teacher.
    - `department` (string): The department of the teacher.
    - `school` (string): The school of the teacher.
    - `employee_number` (string): The employee number of the teacher.
    - `registration_number` (string): The registration number of the teacher.
    - `subjects` (array of strings): The subjects taught by the teacher.
    - `designation` (string): The designation of the teacher.
    - `university_email` (string): The university email address of the teacher.
    - `joining_date` (string): The joining date of the teacher.
- Response:
    - Status: `200 OK`
    - Body: `{ "user": "<teacher_id>" }`

## Change Password

Change the password of a teacher.

- Route: `POST /teacher/change-password`
- Request Body:
    - `teacher_id` (string): The ID of the teacher.
    - `old_password` (string): The old password of the teacher.
    - `new_password` (string): The new password of the teacher.
    - `confirm_new_password` (string): The confirmation of the new password.
- Response:
    - Status: `200 OK`
    - Body: `"Password changed successfully"`

## Teacher Login

Authenticate a teacher and generate a token.

- Route: `POST /login/teacher`
- Request Body:
    - `email` (string): The email address of the teacher.
    - `password` (string): The password of the teacher.
- Response:
    - Status: `200 OK`
    - Body: `{ "message": "Logged in successfully!" }`

## Get Single Teacher Information by ID

Retrieve information about a single teacher using the teacher ID.

- Route: `GET /teacher/:id`
- Parameters:
    - `id` (string): The ID of the teacher.
- Response:
    - Status: `200 OK`
    - Body: The teacher object.

## Get All Teachers Information

Retrieve information about all teachers.

- Route: `GET /teachers`
- Response:
    - Status: `200 OK`
    - Body: An array of teacher objects.
