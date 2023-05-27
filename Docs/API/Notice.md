# Noticeboard API

This API allows you to manage notices on a noticeboard.

## Get All Notices

Retrieve all notices from the noticeboard.

- Route: `GET /noticeboard`
- Response:
    - Status: `200 OK`
    - Body: An array of notice objects.

## Get a Single Notice

Retrieve a single notice by its ID.

- Route: `GET /noticeboard/:id`
- Parameters:
    - `id` (string): The ID of the notice to retrieve.
- Response:
    - Status: `200 OK`
    - Body: The notice object.

## Create a Notice

Create a new notice on the noticeboard.

- Route: `POST /noticeboard`
- Request Body:
    - `title` (string): The title of the notice.
    - `publisher` (string): The name of the publisher of the notice.
    - `notice` (string): The content of the notice.
    - `date` (string): The date of the notice.
- Response:
    - Status: `201 Created`
    - Body: The newly created notice object.

## Update a Notice

Update an existing notice on the noticeboard.

- Route: `PATCH /noticeboard/:id`
- Parameters:
    - `id` (string): The ID of the notice to update.
- Request Body (optional):
    - `title` (string): The updated title of the notice.
    - `publisher` (string): The updated name of the publisher of the notice.
    - `notice` (string): The updated content of the notice.
    - `date` (string): The updated date of the notice.
- Response:
    - Status: `200 OK`
    - Body: The updated notice object.

## Delete a Notice

Delete a notice from the noticeboard.

- Route: `DELETE /noticeboard/:id`
- Parameters:
    - `id` (string): The ID of the notice to delete.
- Response:
    - Status: `200 OK`
    - Body: `{ "message": "Post deleted" }`
