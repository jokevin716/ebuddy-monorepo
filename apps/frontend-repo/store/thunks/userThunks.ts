import { createAsyncThunk } from "@reduxjs/toolkit"
import { userApiService } from "@/apis/userApi"
import { User, UserUpdatePayload } from "@ebuddy/shared"

// fetch current user data
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser', 
  async(userId: string | undefined, { rejectWithValue }) => {
    try {
      const userData = await userApiService.getCurrentUser(userId)
      return userData
    }
    catch(err: any) {
      return rejectWithValue(err.message)
    }
  }
)

// fetch all users
export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async(_, { rejectWithValue }) => {
    try {
      const users = await userApiService.getAllUsers()
      return users
    }
    catch(err: any) {
      return rejectWithValue(err.message)
    }
  }
)

// update user data
export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async(
    payload: {
      userId?: string
      updateData: UserUpdatePayload
    },
    { rejectWithValue }
  ) => {
    try {
      const { userId, updateData } = payload
      const updatedUser = userId
        ? await userApiService.updateUser(userId, updateData)
        : await userApiService.updateCurrentUser(updateData)
      return updatedUser
    }
    catch(err: any) {
      return rejectWithValue(err.message)
    }
  }
)

// update current user data
export const updateCurrentUser = createAsyncThunk(
  'user/updateCurrentUser',
  async(updateData: UserUpdatePayload, { rejectWithValue }) => {
    try {
      const updatedUser = await userApiService.updateCurrentUser(updateData)
      return updatedUser
    }
    catch(err: any) {
      return rejectWithValue(err.message)
    }
  }
)