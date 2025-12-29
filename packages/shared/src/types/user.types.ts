export interface User {
  id: string
  phone: string
  nickname?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  phone: string
  code: string
}

export interface LoginResponse {
  token: string
  user: User
}
