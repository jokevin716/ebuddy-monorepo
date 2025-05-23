# EBUDDY Technical Test - Monorepo

This is a monorepo containing both backend and frontend applications for the EBUDDY technical test, managed with Turborepo.

## 📁 Project Structure

```
ebuddy-monorepo/
├── apps/
│   ├── backend-repo/       # Express.js API with Firebase
│   │   ├── config/         # Firebase configuration
│   │   ├── controller/     # API controllers
│   │   ├── core/           # Express app setup
│   │   ├── entities/       # Data entities
│   │   ├── middleware/     # Authentication middleware
│   │   ├── repository/     # Firestore operations
│   │   ├── routes/         # API routes
│   │   └── package.json
│   └── frontend-repo/      # Next.js app with React MUI
│       ├── apis/           # API abstraction layer
│       ├── app/            # Next.js App Router pages
│       ├── components/     # React components (atomic design)
│       ├── firebase/       # Firebase config file
│       ├── store/          # Redux state management
│       ├── theme/          # MUI theme configuration
│       └── package.json
├── packages/
│   └── shared/             # Shared types and utilities
│       ├── src/
│       │   ├── types/
│       │   │   └── user.ts # User interface definitions
│       │   └── index.ts    # Main export file
│       ├── package.json
│       └── tsconfig.json
├── package.json            # Root workspace configuration
├── turbo.json              # Turborepo pipeline configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- Firebase CLI (for emulator)

## 📋 How to run this monorepo?

1. On folder /apps/frontend-repo, open command prompt and type this script to install all dependencies:
```bash
npm i
```
2. Do the same thing folder /apps/backend-repo, open command prompt and type this script to install all dependencies:
```bash
npm i
```
3. Then, back to root level of this project, open command prompt and type this script to run both frontend and backend side:
```bash
npx turbo run dev
```

## 🔧 Applications

### Backend (/apps/backend-repo)

**Tech Stack:**
- Express.js
- Firebase Admin SDK
- TypeScript
- Firestore

**Available Endpoints:**
- `GET /user-data` - Fetches current user data from Firestore
- `GET /user-data/{userId}` - Fetches a user data from Firestore from a user ID
- `GET /users` - Fetches all user data from Firestore
- `POST /create-user-data` - Create a user data to Firestore
- `PUT /update-user-data` - Update current user data from Firestore
- `PUT /update-user-data/{userId}` - Update a user data from Firestore

**Authentication:**
- Custom middleware validates request tokens
- Both endpoints use the same User interface

### Frontend (/apps/frontend-repo)

**Tech Stack:**
- Next.js 15 (App Router)
- React 19
- Material-UI (MUI) 7
- Redux Toolkit
- Firebase Authentication
- TypeScript

**Features:**
- Mobile-responsive login form
- Firebase authentication
- User data fetching and updating
- Redux state management
- Loading/success/error states