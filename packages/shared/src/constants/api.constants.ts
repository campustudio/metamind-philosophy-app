export const API_BASE_URL = 'http://localhost:3000'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
} as const
