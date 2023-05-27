## Course API

### Get All Courses

Returns all courses.

**Route:** `/courses`
**Method:** `GET`
**Description:** Retrieves all courses.

**Response:**
- `200 OK`: Successfully retrieved the list of courses.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Get Course

Returns a single course by ID.

**Route:** `/course/:id`
**Method:** `GET`
**Description:** Retrieves a single course based on the provided ID.

**Parameters:**
- `id` (required): ID of the course.

**Response:**
- `200 OK`: Successfully retrieved the course.
- `404 Not Found`: Course not found.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Create Course

Creates a new course.

**Route:** `/course`
**Method:** `POST`
**Description:** Creates a new course with the provided details.

**Request Body:**
The request body should contain the following properties:
- `name` (required): Name of the course.
- `description` (required): Description of the course.
- `school` (required): School of the course.
- `department` (required): Department of the course.
- `total_semesters` (required): Total number of semesters in the course.
- `semester` (required): Semester of the course.
- `subjects` (required): Subjects in the course.

**Response:**
- `201 Created`: Successfully created the course.
- `400 Bad Request`: Invalid request body.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Update Course

Updates an existing course by ID.

**Route:** `/course/:id`
**Method:** `PATCH`
**Description:** Updates a course with the provided ID and details.

**Parameters:**
- `id` (required): ID of the course.

**Request Body:**
The request body can contain the following properties (partial update is supported):
- `name` (optional): Updated name of the course.
- `description` (optional): Updated description of the course.
- `school` (optional): Updated school of the course.
- `department` (optional): Updated department of the course.
- `total_semesters` (optional): Updated total number of semesters in the course.
- `semester` (optional): Updated semester of the course.
- `subjects` (optional): Updated subjects in the course.

**Response:**
- `200 OK`: Successfully updated the course.
- `400 Bad Request`: Invalid request body.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Delete Course

Deletes a course by ID.

**Route:** `/course/:id`
**Method:** `DELETE`
**Description:** Deletes the course with the provided ID.

**Parameters:**
- `id` (required): ID of the course.

**Response:**
- `200 OK`: Successfully deleted the course.
- `500 Internal Server Error`: An error occurred while processing the request.

---

### Middleware: Get Course by ID

Middleware function to get a single course by ID.

**Description:** Retrieves a course based on the provided ID and stores it in the `res.course` property.

```javascript
router.use('/course/:id', getCourse);
