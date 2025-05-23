import { firestore } from '../config/firebaseConfig'
import { User, UserUpdatePayload } from '@ebuddy/shared'

export class UserRepository {
  private collection = firestore.collection('users')

  async getUserById(userId: string): Promise<User | null> {
    try {
      const userDoc = await this.collection.doc(userId).get()

      if(!userDoc.exists) {
        return null
      }

      const userData = userDoc.data() as Omit<User, 'id'>

      return {
        id: userDoc.id,
        ...userData
      }
    }
    catch(err) {
      console.error('Error fetching user: ', err)
      throw err
    }
  }

  async createUser(userId: string, userData: User): Promise<User> {
    try {
      const userDoc = await this.collection.doc(userId).get()

      if(!userDoc.exists) {
        await this.collection.doc(userId).set(userData, { merge: true })
      }
      else {
        await this.collection.doc(userId).set({
          updatedAt: new Date().toISOString()
        }, { merge: true })
      }

      const newUserData = userDoc.data() as Omit<User, 'id'>

      return {
        id: userDoc.id,
        ...newUserData
      }
    }
    catch(err) {
      console.error('Error fetching user: ', err)
      throw err
    }
  }

  async updateUser(userId: string, userData: UserUpdatePayload): Promise<User> {
    try {
      const updateData = {
        ...userData,
        updatedAt: new Date().toISOString()
      }

      await this.collection.doc(userId).update(updateData)

      // get the updated user data
      const updatedUser = await this.getUserById(userId)

      if(!updatedUser) {
        throw new Error('Failed to retrieve updated user')
      }

      return updatedUser
    }
    catch(err) {
      console.error('Error updating user: ', err)
      throw err
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const usersSnapshot = await this.collection.get()
      const users: User[] = []

      usersSnapshot.forEach(doc => {
        const userData = doc.data() as Omit<User, 'id'>
        users.push({
          id: doc.id,
          ...userData
        })
      })

      return users
    }
    catch (err) {
      console.error('Error fetching all users: ', err)
      throw err
    }
  }
}