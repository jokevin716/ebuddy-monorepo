import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}

// init firebase
const app = initializeApp(firebaseConfig)

// init firebase features
const auth = getAuth(app)
const db = getFirestore(app)

// connect to emulator in dev mode
if(process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // only connect to emulator if not connected
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, 'localhost', 8080)
  }
  catch(err) {
    console.log('Emulators already connected or not available')
  }
}

export {
  auth,
  db,
}

export default app