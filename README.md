---

# Node.js Authentication API

This is a Node.js project that implements user authentication with signup, login, email verification, and profile management features. It uses Express.js for the server, MongoDB for data storage, and JWT for secure user authentication. Additionally, it integrates email confirmation functionality after user registration.

---

## Features

- **User Signup**: Users can register with a username, email, and password. A confirmation email is sent to the user with a code to verify their email.
- **Email Verification**: Verifies the user's email using a unique confirmation code.
- **User Login**: Users can log in using their email and password once verified.
- **User Profile**: Users can retrieve their profile information once logged in and verified.
- **JWT Authentication**: JSON Web Tokens (JWT) are used for secure authentication.
- **Email Notification**: Sends confirmation emails via Nodemailer.

---

## Setup Instructions

Follow these steps to set up the project for development:

### Prerequisites

Ensure you have the following installed:
- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: Install and set up a local MongoDB instance, or use a cloud-based MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Environment Variables

Create a `.env` file in the root directory of the project and configure it as follows:

```env
MONGO_URI=mongodb://localhost:27017/your_database_name   # MongoDB URI
JWT_SECRET=your_jwt_secret_here                         # Secret for JWT signing
EMAIL_USER=your_email@gmail.com                         # Email for sending confirmation codes
EMAIL_PASS=your_email_password                          # App-specific email password
```

### Install Dependencies

Clone the repository and install dependencies using the following commands:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

### Running the Application

Start the development server using `nodemon` (or `node` if `nodemon` is not installed):

```bash
npm run dev   # For development with hot-reloading
npm start     # For production
```

By default, the server runs on `http://localhost:5000`.

---

## API Usage Guide

This project provides a RESTful API for user authentication and profile management. Below are the available endpoints and their functionalities.

### 1. **POST /api/signup**

**Description**: Register a new user and send an email confirmation code.

**Request Body**:

```json
{
  "Name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Response**:

- **Status: 201**
  ```json
  {
    "message": "User registered successfully. Please check your email for the confirmation code.",
    "user": {
      "id": "user_id",
      "Name": "John Doe",
      "email": "john.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```

- **Status: 400**: If the email already exists or invalid format:
  ```json
  {
    "message": "User already exists"
  }
  ```

---

### 2. **POST /api/verify-email**

**Description**: Verify a user's email with the confirmation code sent via email.

**Request Body**:

```json
{
  "email": "john.doe@example.com",
  "confirmationCode": "16-byte-random-code"
}
```

**Response**:

- **Status: 200**: If successful:
  ```json
  {
    "message": "Email successfully verified"
  }
  ```

- **Status: 400**: If the code is invalid or expired:
  ```json
  {
    "message": "Invalid or expired confirmation code"
  }
  ```

---

### 3. **POST /api/login**

**Description**: Log in an existing user.

**Request Body**:

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Response**:

- **Status: 200**: If successful:
  ```json
  {
    "message": "Logged in successfully",
    "user": {
      "id": "user_id",
      "Name": "John Doe",
      "email": "john.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```

- **Status: 401**: If invalid credentials or unverified email:
  ```json
  {
    "message": "Invalid credentials or unverified email"
  }
  ```

---

### 4. **GET /api/profile**

**Description**: Retrieve the logged-in user's profile.

**Headers**:
- `Authorization: Bearer <JWT_TOKEN>`

**Response**:

- **Status: 200**:
  ```json
  {
    "id": "user_id",
    "Name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```

- **Status: 401**: If the token is missing or invalid:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## How Email Confirmation Works

1. **Sign Up**: A confirmation email is sent with a unique code upon user registration.
2. **Verification**: The user inputs the code into the `/api/verify-email` endpoint to verify their email address.
3. **Login**: The user can log in only after email verification is successful.

---

## Troubleshooting

- **Email Not Received**: Ensure the email address is correct and check the spam folder. Double-check the email credentials in `.env`.
- **Database Connection Errors**: Verify that `MONGO_URI` in `.env` points to the correct MongoDB instance.
- **JWT Issues**: Ensure `JWT_SECRET` in `.env` matches the one used in the code.

---

## License

This project is open source and available under the [MIT License](LICENSE).
```

---
