# Homework API

This API allows you to manage homework data.

## Create a New Homework

Create a new homework record.

- Route: `POST /homework`
- Request Body:
    - `course_id` (string): The ID of the course associated with the homework.
    - `semester` (string): The semester of the homework.
    - `subject` (string): The subject of the homework.
    - `title` (string): The title of the homework.
    - `from_date` (string): The starting date of the homework.
    - `to_date` (string): The ending date of the homework.
    - `questions` (array): An array of questions for the homework.
    - `assigned_by` (string): The name of the person who assigned the homework.
- Response:
    - Status: `201 Created`
    - Body: `{ "message": "Homework created successfully" }`

## Submit Answer to Homework

Submit a student's answer to a specific homework.

- Route: `POST /homework/:id`
- Parameters:
    - `id` (string): The ID of the homework to submit the answer to.
- Request Body:
    - `student` (string): The name of the student submitting the answer.
    - `answer` (string): The answer provided by the student.
    - `date` (string): The submission date.
    - `time` (string): The submission time.
- Response:
    - Status: `201 Created`
    - Body: `{ "message": "Answer submitted successfully" }`

## Get All Answers for a Homework

Retrieve all the answers submitted for a specific homework.

- Route: `GET /homework/:homeworkId/answers`
- Parameters:
    - `homeworkId` (string): The ID of the homework to retrieve the answers for.
- Response:
    - Status: `200 OK`
    - Body: `{ "answers": [ { ... }, { ... }, ... ] }`

## Get Student's Answer for a Homework

Retrieve a specific student's answer for a specific homework.

- Route: `GET /homework/answers`
- Query Parameters:
    - `homework_id` (string): The ID of the homework.
    - `student_id` (string): The ID of the student.
- Response:
    - Status: `200 OK`
    - Body:
        - If the answer is found: `{ "status": "Submitted", "answer": "...", "time": "...", "date": "..." }`
        - If the answer is not found: `{ "status": "Pending" }`

## Get All Homeworks

Retrieve all the homework records.

- Route: `GET /homeworks`
- Query Parameters (optional):
    - `course_id` (string): Filter by course ID.
    - `semester` (string): Filter by semester.
    - `assigned_by` (string): Filter by the name of the person who assigned the homework.
- Response:
    - Status: `200 OK`
    - Body: An array of homework records.

## Get Single Homework by ID

Retrieve a specific homework record by its ID.

- Route: `GET /homework/:id`
- Parameters:
    - `id` (string): The ID of the homework to retrieve.
- Response:
    - Status: `200 OK`
    - Body: The homework record.

## Delete Homework

Delete a specific homework record by its ID.

- Route: `DELETE /homework/:id`
- Parameters:
    - `id` (string): The ID of the homework to delete.
- Response:
    - Status: `200 OK`
    - Body: `{ "message": "Homework deleted successfully" }`
