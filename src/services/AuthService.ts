import axios from 'axios'

// Define the base URL for API requests
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Define interface for login parameters
interface LoginParams {
  email: string
  password: string
  rememberMe?: boolean
}

// Define interface for register parameters
interface RegisterParams {
  name: string
  email: string
  password: string
}

// Define interface for login response
interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

// Auth service with authentication-related methods
const AuthService = {
  // Login method
  async login(params: LoginParams): Promise<AuthResponse> {
    // For demo purposes, simulate API call
    // In a real app, this would be a real API call to your backend
    // return apiClient.post('/auth/login', params)

    // Mock implementation for demo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if credentials match demo user
        if (params.email === 'demo@example.com' && params.password === 'Password123') {
          resolve({
            token: 'mock-jwt-token',
            user: {
              id: '1',
              name: 'Demo User',
              email: 'demo@example.com'
            }
          })
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 800) // Simulate network delay
    })
  },

  // Registration method
  async register(params: RegisterParams): Promise<void> {
    // For demo purposes, simulate API call
    // In a real app, this would be a real API call to your backend
    // return apiClient.post('/auth/register', params)

    // Mock implementation for demo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate email already exists error for specific email
        if (params.email === 'existing@example.com') {
          reject({
            response: {
              status: 409,
              data: {
                message: 'Email already exists'
              }
            }
          })
        } else {
          resolve()
        }
      }, 800) // Simulate network delay
    })
  },

  // Forgot password method
  async forgotPassword(_email: string): Promise<void> {
    // For demo purposes, simulate API call
    // In a real app, this would be a real API call to your backend
    // return apiClient.post('/auth/forgot-password', { email })

    // Mock implementation for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 800) // Simulate network delay
    })
  },

  // Logout method
  logout(): void {
    localStorage.removeItem('token')
  }
}

export default AuthService
