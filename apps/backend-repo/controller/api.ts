import { Request, Response } from 'express'
import { UserRepository } from '../repository/userCollection'
import { AuthenticatedRequest } from '../middleware/authMiddleware'
import { User, UserUpdatePayload } from '@ebuddy/shared'

const userRepository = new UserRepository()

export const getUserData = async(req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId || req.user?.uid

    if(!userId) {
      res.status(400).json({ error: 'User ID is required '})
      return
    }

    const userData = await userRepository.getUserById(userId)

    if(!userData) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.status(200).json({ data: userData })
  }
  catch(err) {
    console.error('Error in getUserData: ', err)
    res.status(500).json({ error: 'Internal server error '})
  }
}

export const getAllUsers = async(_req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepository.getAllUsers();
    res.status(200).json({ data: users })
  }
  catch(err) {
    console.error('Error in getAllUsers: ', err)
    res.status(500).json({ error: 'Internal server error '})
  }
}

export const createUserData = async(req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.uid
    const userData: User = req.body

    if(!userId) {
      res.status(400).json({ error: 'User ID is required '})
      return
    }

    const newUser = await userRepository.createUser(userId, userData)

    res.status(200).json({
      message: 'User created successfully',
      data: newUser,
    })
  }
  catch(err) {
    console.error('Error in createUserData: ', err)
    res.status(500).json({ error: 'Internal server error '})
  }
}

export const updateUserData = async(req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId || req.user?.uid
    const updateData: UserUpdatePayload = req.body

    if(!userId) {
      res.status(400).json({ error: 'User ID is required '})
      return
    }

    // check if user exists
    const existingUser = await userRepository.getUserById(userId)

    if(!existingUser) {
      res.status(404).json({error: 'User not found' })
      return
    }

    // validate update data
    if(Object.keys(updateData).length === 0) {
      res.status(400).json({ error: 'No update data provided' })
      return
    }

    // update the user
    const updatedUser = await userRepository.updateUser(userId, updateData)

    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
    })
  }
  catch(err) {
    console.error('Error in updateUserData: ', err)
    res.status(500).json({ error: 'Internal server error '})
  }
}