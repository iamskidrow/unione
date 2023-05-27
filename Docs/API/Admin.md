# Admin API

This API allows you to manage admin-related operations.

## Admin Registration

Register a new admin.

- Route: `POST /admin`
- Request Body:
    - `firstName` (string): The first name of the admin.
    - `lastName` (string): The last name of the admin.
    - `phone` (string): The phone number of the admin.
    - `email` (string): The email address of the admin.
    - `password` (string): The password of the admin.
- Response:
    - Status: `200 OK`
    - Body: `{ "user": "<admin_id>" }`

## Admin Login

Authenticate an admin and generate a token.

- Route: `POST /login/admin`
- Request Body:
    - `email` (string): The email address of the admin.
    - `password` (string): The password of the admin.
- Response:
    - Status: `200 OK`
    - Body: `{ "message": "Logged in successfully!" }`

## Get Single Admin Information by ID

Retrieve information about a single admin using the admin ID.

- Route: `GET /admin/:id`
- Parameters:
    - `id` (string): The ID of the admin.
- Response:
    - Status: `200 OK`
    - Body: The admin object.

## Get All Admins Information

Retrieve information about all admins.

- Route: `GET /admins`
- Response:
    - Status: `200 OK`
    - Body: An array of admin objects.
