# Backend Repository

This is the backend for the EBUDDY technical test, built with Express.js and Firebase.

## Prerequisites

- Node.js 22 and npm
- Firebase project (for production) or Firebase emulators (for development)

## Setup

Install dependencies:
```
npm install
```

## Run the Development Server

```
npm run dev
```

## Run with Firebase Emulators

1. Build the project:
   ```
   npm run build
   ```

2. Start the Firebase emulators:
   ```
   firebase emulators:start
   ```

## API Endpoints

All endpoints are protected by authentication. You need to include a valid Firebase ID token in the request headers:

```
Authorization: Bearer <firebase-id-token>
```

### Get User Data
- **Endpoint**: GET `/api/user-data/:userId`
- **Description**: Fetches user data from Firestore
- **Parameters**:
  - `userId` (optional): The ID of the user to fetch. If not provided, uses the authenticated user's ID.

### Get All Users
- **Endpoint**: GET `/api/users`
- **Description**: Fetches all users from the USERS collection

### Create User Data
- **Endpoint**: PUT `/api/create-user-data`
- **Description**: Create user data in Firestore
- **Body**: JSON object with user data

### Update User Data
- **Endpoint**: PUT `/api/update-user-data/:userId`
- **Description**: Updates user data in Firestore
- **Parameters**:
  - `userId` (optional): The ID of the user to update. If not provided, uses the authenticated user's ID.
- **Body**: JSON object with user fields to update