'use client'

import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase/config"
import { useAppDispatch } from "@/store/hooks"
import { setUser, setLoading } from "@/store/slices/authSlice"

interface AuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user))
      dispatch(setLoading(false))
    })

    return () => unsub()
  }, [dispatch])

  return <>{children}</>
}