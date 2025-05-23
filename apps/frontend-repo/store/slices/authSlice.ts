import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User as FirebaseUser } from "firebase/auth"

interface AuthState {
  user: FirebaseUser | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
      state.loading = false
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    }
  }
})

export const {
  setUser,
  setLoading,
  setError,
  clearError,
  logout
} = authSlice.actions

export default authSlice.reducer