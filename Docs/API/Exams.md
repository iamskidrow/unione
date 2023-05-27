## Exam API

### Create Exam

Creates a new exam.

**Route:** `/exam`
**Method:** `POST`
**Description:** Creates a new exam with the provided details.

**Request Body:**
The request body should contain the following properties:
- `course_id` (required): ID of the course.
- `semester` (required): Semester of the exam.
- `exam_name` (required): Name of the exam.
- `subject` (required): Subject of the exam.
- `marks` (required): Marks for the exam.
- `date` (required): Date of the exam.
- `start_time` (required): Start time of the exam.
- `end_time` (required): End time of the exam.
- `posted_by` (required): ID of the user who posted the exam.
- `questions` (required): Questions for the exam.

**Response:**
- `201 Created`: Exam created successfully.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Submit Exam Answer

Submits a student's answer to an exam.

**Route:** `/exam/:id`
**Method:** `POST`
**Description:** Submits a student's answer to the specified exam.

**Parameters:**
- `id` (required): ID of the exam.

**Request Body:**
The request body should contain the following properties:
- `student` (required): ID of the student.
- `answer` (required): Answer submitted by the student.
- `date` (required): Date of submission.
- `time` (required): Time of submission.

**Response:**
- `201 Created`: Answer submitted successfully.
- `404 Not Found`: Exam not found.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Get Exam Answers

Returns all the answers submitted for an exam.

**Route:** `/exam/:examId/answers`
**Method:** `GET`
**Description:** Retrieves all the answers submitted for the specified exam.

**Parameters:**
- `examId` (required): ID of the exam.

**Response:**
- `200 OK`: Successfully retrieved the answers.
- `404 Not Found`: Exam not found.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Get Exam Answer by Student

Returns the answer submitted by a student for an exam.

**Route:** `/exams/answers`
**Method:** `GET`
**Description:** Retrieves the answer submitted by a student for the specified exam.

**Query Parameters:**
- `exam_id` (required): ID of the exam.
- `student_id` (required): ID of the student.

**Response:**
- `200 OK`: Successfully retrieved the answer.
- `404 Not Found`: Exam not found or answer not submitted yet.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Get All Exams

Returns all exams.

**Route:** `/exams`
**Method:** `GET`
**Description:** Retrieves all exams based on the specified filters.

**Query Parameters:**
- `course_id` (optional): ID of the course.
- `semester` (optional): Semester of the exam.
- `subject` (optional): Subject of the exam.
- `posted_by` (optional): ID of the user who posted the exam.

**Response:**
- `200 OK`: Successfully retrieved the exams.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Get Exam by ID

Returns a single exam by ID.

**Route:** `/exam/:id`
**Method:** `GET`
**Description:** Retrieves a single exam based on the provided ID.

**Parameters:**
- `id` (required): ID of the exam.

**Response:**
- `200 OK`: Successfully retrieved the exam.
- `404 Not Found`: Exam not found.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Add Result to Exam

Adds a result to an exam.

**Route:** `/result`
**Method:** `POST`
**Description:** Adds a result to the specified exam.

**Request Body:**
The request body should contain the following properties:
- `exam_id` (required): ID of the exam.
- `student_id` (required): ID of the student.
- `marks` (required): Marks obtained by the student.

**Response:**
- `201 Created`: Result added successfully.
- `404 Not Found`: Exam not found.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Get Result by ID

Returns a single result by ID.

**Route:** `/result/:id`
**Method:** `GET`
**Description:** Retrieves a single result based on the provided ID.

**Parameters:**
- `id` (required): ID of the result.

**Response:**
- `200 OK`: Successfully retrieved the result.
- `404 Not Found`: Result not found.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Get Exam Results

Returns all the results of an exam.

**Route:** `/results/:exam_id`
**Method:** `GET`
**Description:** Retrieves all the results of the specified exam.

**Parameters:**
- `exam_id` (required): ID of the exam.

**Query Parameters:**
- `student_id` (optional): ID of the student.

**Response:**
- `200 OK`: Successfully retrieved the results.
- `404 Not Found`: Exam not found.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Delete Exam

Deletes an exam by ID.

**Route:** `/exam/:id`
**Method:** `DELETE`
**Description:** Deletes the exam with the provided ID.

**Parameters:**
- `id` (required): ID of the exam.

**Response:**
- `200 OK`: Exam deleted successfully.
- `404 Not Found`: Exam not found.
- `500 Internal Server Error`: An error occurred while processing the request.
