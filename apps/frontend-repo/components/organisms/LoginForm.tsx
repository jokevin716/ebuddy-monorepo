'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/config"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setError, clearError } from "@/store/slices/authSlice"

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { error } = useAppSelector((state) => state.auth)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    dispatch(clearError())

    try {
      let userCredential

      if(isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, pwd)
      }
      else {
        userCredential = await signInWithEmailAndPassword(auth, email, pwd)
      }

      // create/update data after login
      const user = userCredential.user
      const token = await user.getIdToken()

      console.log(user)

      await fetch(`${process.env.BACKEND_API_URL}/create-user-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: user.uid,
          name: user.displayName || email.split('@')[0],
          email: user.email,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      })

      router.push('/dashboard')
    }
    catch(err: any) {
      dispatch(setError(err.message))
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        py={3}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            p: isMobile ? 2 : 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ mb: 3 }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                autoComplete="email"
                autoFocus
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                margin="normal"
                required
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </Button>
              
              <Box textAlign="center">
                <Button
                  variant="text"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    dispatch(clearError());
                  }}
                  disabled={loading}
                >
                  {isSignUp 
                    ? 'Already have an account? Sign In' 
                    : "Don't have an account? Sign Up"
                  }
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}