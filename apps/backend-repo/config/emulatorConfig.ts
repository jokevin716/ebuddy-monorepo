import { firestore } from '../config/firebaseConfig'

const connectToEmulators = () => {
  if(process.env.NODE_ENV === 'dev') {
    // connect to Firebase emulators
    const FIRESTORE_EMULATOR_HOST = process.env.EMULATOR_HOST || 'localhost:8080'
    
    firestore.settings({
      host: FIRESTORE_EMULATOR_HOST,
      ssl: false,
    })
    
    console.log(`Connected to Firestore emulator at ${FIRESTORE_EMULATOR_HOST}`)
  }
}

export default connectToEmulators