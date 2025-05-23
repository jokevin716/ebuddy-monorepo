'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/organisms/LoginForm"
import { useAppSelector } from "@/store/hooks"

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if(!loading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, loading, router])

  if(loading) {
    return null
  }

  if(isAuthenticated) {
    return null
  }

  return <LoginForm />
}