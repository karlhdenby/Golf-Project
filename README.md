# Golf-Project

## Description
This project provides a backend for managing memberships, rates, and user permissions for a golf course.

---

### Routes

#### User Signup Route

- **POST** `/api/users`
  - Registers a new user with a hashed password and stores a secure cookie.
  - **Validation**: 
    - `email` must be valid.
    - `username` must be at least 4 characters and not an email.
    - `password` must be at least 6 characters.
  - **Response**: Returns the `id`, `email`, and `username` of the created user.

#### CSRF Token Route

- **GET** `/api/csrf/restore`
  - Restores the CSRF token and sets it in a cookie.
  - **Response**: JSON object containing the CSRF token.

---

### Membership Routes

- **GET** `/api/memberships`
  - Fetches all memberships.
  - **Response**: Returns an array of all membership records.

- **POST** `/api/memberships`
  - Creates a new membership with the given details.
  - **Body Parameters**:
    - `membership` - The name/type of the membership.
    - `price` - The price of the membership.
    - `description` - Description of the membership.
  - **Response**: Returns the created membership.

- **PUT** `/api/memberships/:membershipId`
  - Updates an existing membership.
  - **Parameters**: `membershipId` - ID of the membership to update.
  - **Body Parameters**: Properties to update in the membership.
  - **Authorization**: Requires a user rank of 3 or higher.
  - **Response**: Returns the updated membership.

- **DELETE** `/api/memberships/:membershipId`
  - Deletes a specific membership by its ID.
  - **Parameters**: `membershipId` - ID of the membership to delete.
  - **Authorization**: Requires a user rank of 3 or higher.
  - **Response**: Confirmation message on successful deletion.

---

### Rate Routes

- **GET** `/api/rates`
  - Fetches all rates.
  - **Response**: Returns an array of all rate records.

- **POST** `/api/rates`
  - Creates a new rate with the given details.
  - **Body Parameters**:
    - `item` - The name of the item being rated.
    - `price` - The price associated with the item.
  - **Response**: Returns the created rate.

- **PUT** `/api/rates/:rateId`
  - Updates an existing rate.
  - **Parameters**: `rateId` - ID of the rate to update.
  - **Body Parameters**: Properties to update in the rate.
  - **Authorization**: Requires a user rank of 3 or higher.
  - **Response**: Returns the updated rate.

- **DELETE** `/api/rates/:rateId`
  - Deletes a specific rate by its ID.
  - **Parameters**: `rateId` - ID of the rate to delete.
  - **Authorization**: Requires a user rank of 3 or higher.
  - **Response**: Confirmation message on successful deletion.

---

### Error Handling
- Each route includes basic error handling that returns the error details if any issues occur during the process.

---

## Additional Notes
- Make sure to have the `Membership` and `Rate` models properly defined in your database models.
- Use proper authentication and authorization mechanisms to protect sensitive routes.
- Follow RESTful principles to maintain a clean and organized API structure.

---

## Installation
To run the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
