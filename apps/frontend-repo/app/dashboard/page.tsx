'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Divider
} from "@mui/material"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/config"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/store/slices/authSlice"
import { clearUserData } from "@/store/slices/userSlice"
import UpdateButton from "@/components/molecules/UpdateButton"
import UserDataDisplay from "@/components/molecules/UserDataDisplay"
import ErrorBoundary from "@/components/organisms/ErrorBoundary"

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const { currentUser } = useAppSelector((state) => state.user)

  useEffect(() => {
    if(!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleLogout = async() => {
    try {
      await signOut(auth)
      dispatch(logout())
      dispatch(clearUserData())
      router.push('/login')
    }
    catch(err) {
      console.error('Logout error: ', err)
    }
  }

  if(!isAuthenticated) {
    return null
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h3" component="h1">
            Dashboard
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* User Info Card */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Firebase Auth Info
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {user?.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              UID: {user?.uid}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email Verified: {user?.emailVerified ? 'Yes' : 'No'}
            </Typography>
          </CardContent>
        </Card>

        {/* API Integration Section */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fetch User Data
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Click the button below to fetch user information from the backend API.
                </Typography>
                
                <UpdateButton actionType="fetch" />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Update User Data
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Click the button below to update user information via the backend API.
                </Typography>
                
                <UpdateButton 
                  actionType="update" 
                  updateData={{
                    isActive: true
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* User Data Display */}
          {currentUser && (
            <Grid size={{ xs: 12 }}>
              <UserDataDisplay 
                user={currentUser} 
                title="Current User Data from Backend"
              />
            </Grid>
          )}
        </Grid>

        {/* Instructions */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" paragraph>
              1. Use the "Fetch User Data" button to retrieve user information from the backend API.
            </Typography>
            <Typography variant="body2" paragraph>
              2. Use the "Update User Data" button to modify user information through the backend API.
            </Typography>
            <Typography variant="body2" paragraph>
              3. All API calls are authenticated using your Firebase ID token.
            </Typography>
            <Typography variant="body2">
              4. Check the Redux state management in action through the loading, success, and error states.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ErrorBoundary>
  )
}