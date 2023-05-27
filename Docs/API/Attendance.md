## Attendance API

### Get Attendance Record

Returns a single attendance record by ID.

**Route:** `/attendance/:id`
**Method:** `GET`
**Description:** Retrieves a single attendance record based on the provided ID.

**Parameters:**
- `id` (required): ID of the attendance record.

**Response:**
- `200 OK`: Successfully retrieved the attendance record.
- `404 Not Found`: Attendance record not found.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Get Attendance Records

Returns attendance records based on provided filters.

**Route:** `/attendances`
**Method:** `GET`
**Description:** Retrieves attendance records based on student ID, subject, date, and status.

**Parameters:**
- `course_id` (optional): Course ID to filter attendance records.
- `semester` (optional): Semester to filter attendance records.
- `student_id` (optional): Student ID to filter attendance records.
- `subject` (optional): Subject to filter attendance records.
- `date` (optional): Date to filter attendance records.
- `status` (optional): Status to filter attendance records.
- `teacher_id` (optional): Teacher ID to filter attendance records.

**Response:**
- `200 OK`: Successfully retrieved attendance records.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Create Attendance Record

Creates a new attendance record.

**Route:** `/attendance`
**Method:** `POST`
**Description:** Creates a new attendance record with the provided details.

**Request Body:**
The request body should contain the following properties:
- `course_id` (required): Course ID of the attendance record.
- `semester` (required): Semester of the attendance record.
- `student_id` (required): Student ID of the attendance record.
- `subject` (required): Subject of the attendance record.
- `date` (required): Date of the attendance record.
- `status` (required): Status of the attendance record.
- `teacher_id` (required): Teacher ID of the attendance record.

**Response:**
- `201 Created`: Successfully created the attendance record.
- `400 Bad Request`: Invalid request body.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Update Attendance Record

Updates an existing attendance record by ID.

**Route:** `/attendance/:id`
**Method:** `PATCH`
**Description:** Updates an attendance record with the provided ID and details.

**Parameters:**
- `id` (required): ID of the attendance record.

**Request Body:**
The request body can contain the following properties (partial update is supported):
- `course_id` (optional): Updated course ID of the attendance record.
- `semester` (optional): Updated semester of the attendance record.
- `student_id` (optional): Updated student ID of the attendance record.
- `subject` (optional): Updated subject of the attendance record.
- `date` (optional): Updated date of the attendance record.
- `status` (optional): Updated status of the attendance record.
- `teacher_id` (optional): Updated teacher ID of the attendance record.

**Response:**
- `200 OK`: Successfully updated the attendance record.
- `400 Bad Request`: Invalid request body.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Delete Attendance Record

Deletes an attendance record by ID.

**Route:** `/attendance/:id`
**Method:** `DELETE`
**Description:** Deletes the attendance record with the provided ID.

**Parameters:**
- `id` (required): ID of the attendance record.

**Response:**
- `200 OK`: Successfully deleted the attendance record.
- `500 Internal Server Error`: An error occurred while processing the request.
