import * as admin from 'firebase-admin'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Initialize Firebase Admin SDK
const serviceAccount = require('../serviceAccountKey.json')

// Initialize the app if it hasn't been initialized yet
if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  })
}

const firestore = admin.firestore()
const auth = admin.auth()

export {
  admin,
  firestore,
  auth,
}