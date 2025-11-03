import { apiClient } from "@/lib/api"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  vehicle?: {
    make: string
    model: string
    plate: string
    color: string
  }
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export const authService = {
  async register(data: {
    email: string
    password: string
    name: string
  }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/register", data)
    if (response.data) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data!
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", {
      email,
      password,
    })
    if (response.data) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data!
  },

  async logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
  },

  async getProfile() {
    return apiClient.get<User>("/auth/profile")
  },

  async updateProfile(data: Partial<User>) {
    return apiClient.put<User>("/auth/profile", data)
  },

  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken")
    const response = await apiClient.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    })
    if (response.data) {
      localStorage.setItem("token", response.data.token)
    }
    return response.data
  },
}
