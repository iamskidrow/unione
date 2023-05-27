# Timetable API

This API allows you to manage timetables for courses and semesters.

## Add a New Timetable

Create a new timetable for a course and semester.

- Route: `POST /timetable`
- Request Body:
    - `course_id` (string): The ID of the course.
    - `semester` (string): The semester for the timetable.
    - `day` (string): The timetable for the specified day.
- Response:
    - Status: `200 OK`
    - Body: The created timetable object.

## Get Timetable by Course ID and Semester

Retrieve the timetable for a specific course and semester.

- Route: `GET /timetable/:courseId/:semester`
- Parameters:
    - `courseId` (string): The ID of the course.
    - `semester` (string): The semester of the timetable.
- Response:
    - Status: `200 OK`
    - Body: The timetable object.

## Get Timetables by Course ID

Retrieve all timetables for a specific course.

- Route: `GET /timetables/:courseId`
- Parameters:
    - `courseId` (string): The ID of the course.
- Response:
    - Status: `200 OK`
    - Body: An array of timetable objects.

## Update Timetable by Course ID and Semester

Update the timetable for a specific course and semester.

- Route: `PUT /timetable/:courseId/:semester`
- Parameters:
    - `courseId` (string): The ID of the course.
    - `semester` (string): The semester of the timetable.
- Request Body:
    - `day` (string): The updated timetable for the specified day.
- Response:
    - Status: `200 OK`
    - Body: The updated timetable object.

## Delete a Timetable

Delete a timetable for a specific course and semester.

- Route: `DELETE /timetable/:courseId/:semester`
- Parameters:
    - `courseId` (string): The ID of the course.
    - `semester` (string): The semester of the timetable.
- Response:
    - Status: `200 OK`
    - Body: `{ "message": "Timetable deleted successfully" }`
