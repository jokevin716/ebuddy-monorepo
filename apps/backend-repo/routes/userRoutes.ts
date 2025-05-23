import express from 'express'
import { getUserData, updateUserData, getAllUsers, createUserData } from '../controller/api'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

// protected routes, require authentication
router.get('/user-data', authMiddleware, getUserData)
router.get('/user-data/:userId', authMiddleware, getUserData)
router.get('/users', authMiddleware, getAllUsers)
router.post('/create-user-data', authMiddleware, createUserData)
router.put('/update-user-data', authMiddleware, updateUserData)
router.put('/update-user-data/:userId', authMiddleware, updateUserData)

export default router;