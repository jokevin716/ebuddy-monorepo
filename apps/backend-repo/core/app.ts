import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from '../routes/userRoutes'
import connectToEmulators from '../config/emulatorConfig'

// load environment variables
dotenv.config()

// connect to Firebase emulators in development
if(process.env.NODE_ENV === 'dev') {
  connectToEmulators()
}

// init Express app
const app = express()
const port = process.env.APP_PORT || 3001

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/', userRoutes)

// health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' })
})

// start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app