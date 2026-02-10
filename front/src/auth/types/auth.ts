export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Session {
  user: User
  session: {
    id: string
    userId: string
    expiresAt: string
    token: string
  }
}

export interface SignUpData {
  email: string
  password: string
  name: string
  firstName: string
  lastName: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  session: {
    id: string
    userId: string
    expiresAt: string
    token: string
  }
}

export interface AuthError {
  message: string
  status: number
}
