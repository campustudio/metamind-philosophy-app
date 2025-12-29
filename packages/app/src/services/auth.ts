import { post } from './request'
import type { LoginRequest, LoginResponse } from '@yuansixiang/shared'
import { API_ENDPOINTS } from '@yuansixiang/shared'

export const login = (data: LoginRequest) =>
  post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data)

export const logout = () => post(API_ENDPOINTS.AUTH.LOGOUT)
