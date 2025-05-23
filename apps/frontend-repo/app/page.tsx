'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Box, CircularProgress } from "@mui/material"
import { useAppSelector } from "@/store/hooks"

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if(!loading) {
      if(isAuthenticated) {
        router.push('/dashboard')
      }
      else {
        router.push('/login')
      }
    }
  }, [isAuthenticated, loading, router])

  // show loading spinner while determining authentication status
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  )
}