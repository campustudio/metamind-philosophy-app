import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { User, LoginRequest, LoginResponse } from '@yuansixiang/shared'
import { login as loginApi } from '@/services/auth'
import Taro from '@tarojs/taro'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  token: Taro.getStorageSync('token') || null,
  isAuthenticated: !!Taro.getStorageSync('token'),
  loading: false,
  error: null,
}

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials)
      Taro.setStorageSync('token', response.token)
      Taro.setStorageSync('user', response.user)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || '登录失败')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.isAuthenticated = false
      Taro.removeStorageSync('token')
      Taro.removeStorageSync('user')
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      state.isAuthenticated = true
      Taro.setStorageSync('token', action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, setToken } = authSlice.actions
export default authSlice.reducer
