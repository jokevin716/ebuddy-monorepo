import { User, UserUpdatePayload, ApiResponse, ApiError } from "@ebuddy/shared"

const apiBaseURL = process.env.BACKEND_API_URL || 'http://localhost:3001'

class UserApiService {
  private async getAuthToken(): Promise<string> {
    // get Firebase ID token from authenticated user
    const { auth } = await import('../firebase/config')
    const user = auth.currentUser

    if(!user) {
      throw new Error('User not authenticated')
    }

    return await user.getIdToken()
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const token = await this.getAuthToken()

      const response = await fetch(`${apiBaseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      })

      const data = await response.json()

      if(!response.ok) {
        const error = data as ApiError
        throw new Error(error.error || 'API request failed')
      }

      return data
    }
    catch(err) {
      console.error('API request error:', err)
      throw err
    }
  }

  async getCurrentUser(userId?: string): Promise<User> {
    const endpoint = userId ? `/user-data/${userId}` : '/user-data'
    const response = await this.makeRequest<ApiResponse<User>>(endpoint)

    return response.data
  }

  async getAllUsers(): Promise<User[]> {
    const response = await this.makeRequest<ApiResponse<User[]>>('/users')

    return response.data
  }

  async updateUser(userId:string, userData: UserUpdatePayload): Promise<User> {
    const response = await this.makeRequest<ApiResponse<User>>(
      `/update-user-data/${userId}`,
      {
        method: 'PUT',
        body: JSON.stringify(userData)
      }
    )

    return response.data
  }

  async updateCurrentUser(userData: UserUpdatePayload): Promise<User> {
    const response = await this.makeRequest<ApiResponse<User>>(
      `/update-user-data`,
      {
        method: 'PUT',
        body: JSON.stringify(userData)
      }
    )

    return response.data
  }
}

export const userApiService = new UserApiService()