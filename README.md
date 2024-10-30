# Golf-Project
Software

API Routes
Authentication Routes
These routes handle user login, logout, signup, and session restoration.

Session Routes (/api/session)
POST /api/session - Logs a user in by verifying the provided credentials (either email or username) and password. Returns the user's information if successful and sets a session token.

Request Body: { credential: <string>, password: <string> }
Response:
200 OK: { user: { id, email, username } }
401 Unauthorized: { errors: { credential: "The provided credentials were invalid." } }
DELETE /api/session - Logs a user out by clearing the session token cookie.

Response:
200 OK: { message: "success" }
GET /api/session - Restores the session of a logged-in user by returning their information if a valid session exists.

Response:
200 OK: { user: { id, email, username } } if user is logged in.
200 OK: { user: null } if no session exists.
User Routes (/api/users)
POST /api/users - Creates a new user account with the provided email, username, and password. The password is hashed before being stored.
Request Body: { email: <string>, username: <string>, password: <string> }
Response:
200 OK: { user: { id, email, username } }
400 Bad Request: Error message if validation fails (e.g., invalid email format or short password).
Tee Time Routes (/api/teetimes)
These routes handle the creation, modification, deletion, and retrieval of tee times. Authentication is required for certain actions.

GET /api/teetimes - Retrieves a list of all tee times.

Response:
200 OK: { teeTimes: [ { id, username, firstName, lastName, time, players, open }, ... ] }
POST /api/teetimes/new - Creates a new tee time. Requires the user to be authenticated.

Request Body: { firstName: <string>, lastName: <string>, time: <string>, players: <number>, open: <boolean> }
Response:
200 OK: { id, username, firstName, lastName, time, players, open }
PUT /api/teetimes/:teeTimeId - Updates a specific tee time if the authenticated user owns it.

Request Parameters: teeTimeId (ID of the tee time to update)
Request Body: { fieldName: <newValue>, ... } (any fields to update)
Response:
200 OK: Updated tee time object.
403 Forbidden: { message: "Tee Time must belong to current user" } if the user does not own the tee time.
DELETE /api/teetimes/:teeTimeId - Deletes a specific tee time if the authenticated user owns it.

Request Parameters: teeTimeId (ID of the tee time to delete)
Response:
200 OK: { message: "Successfully cancelled tee time" }
403 Forbidden: { message: "Tee Time must belong to current user" } if the user does not own the tee time.
CSRF Token Route
GET /api/csrf/restore - Restores the CSRF token for security purposes, setting it in a cookie for frontend use.
Response:
200 OK: { "XSRF-Token": <token> }
Test Route
POST /api/test - A test route for debugging that echoes the request body.
Request Body: { anyKey: anyValue }
Response:
200 OK: { requestBody: req.body }
