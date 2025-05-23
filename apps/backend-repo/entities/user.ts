export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface UserUpdatePayload {
  name?: string
  email?: string
  isActive?: boolean
}