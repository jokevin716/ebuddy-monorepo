import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@/apis/user"
import { 
  fetchCurrentUser,
  fetchAllUsers,
  updateUserData,
  updateCurrentUser
} from '../thunks/userThunks'

interface UserState {
  currentUser: User | null
  users: User[]
  loading: boolean
  error: string | null
  updateLoading: boolean
  updateSuccess: boolean
  updateError: string | null
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
  updateLoading: false,
  updateSuccess: false,
  updateError: null,
}

const userSlice= createSlice({
  name: 'user',
  initialState,
  reducers: {
    // clear update status
    clearUpdateStatus: (state) => {
      state.updateSuccess = false
      state.updateError = null
    },

    // clear all user data
    clearUserData: (state) => {
      state.currentUser = null
      state.users = [],
      state.loading = false
      state.error = null
      state.updateLoading = false
      state.updateSuccess = false
      state.updateError = null
    },
  },
  extraReducers: (builder) => {
    // fetch current user
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false
      state.currentUser = action.payload
      state.error = null
    })
    .addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // fetch all users
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = null
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // update user data
    builder.addCase(updateUserData.pending, (state) => {
      state.updateLoading = true
      state.updateError = null
      state.updateSuccess = false
    })
    .addCase(updateUserData.fulfilled, (state, action) => {
      state.updateLoading = false
      state.currentUser = action.payload
      state.updateSuccess = true
      state.updateError = null
    })
    .addCase(updateUserData.rejected, (state, action) => {
      state.updateLoading = false
      state.updateError = action.payload as string
      state.updateSuccess = false
    })

    // update current user
    builder.addCase(updateCurrentUser.pending, (state) => {
      state.updateLoading = true
      state.updateError = null
      state.updateSuccess = false
    })
    .addCase(updateCurrentUser.fulfilled, (state, action) => {
      state.updateLoading = false
      state.currentUser = action.payload
      state.updateSuccess = true
      state.updateError = null
    })
    .addCase(updateCurrentUser.rejected, (state, action) => {
      state.updateLoading = false
      state.updateError = action.payload as string
      state.updateSuccess = false
    })
  }
})

export const {
  clearUpdateStatus,
  clearUserData,
} = userSlice.actions

export default userSlice.reducer