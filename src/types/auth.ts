export interface LoginParams {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterParams {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}
