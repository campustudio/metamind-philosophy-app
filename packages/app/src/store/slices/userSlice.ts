import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@yuansixiang/shared'
import Taro from '@tarojs/taro'

interface UserState {
  currentUser: User | null
  loading: boolean
}

const initialState: UserState = {
  currentUser: Taro.getStorageSync('user') || null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload
      Taro.setStorageSync('user', action.payload)
    },
    clearUser(state) {
      state.currentUser = null
      Taro.removeStorageSync('user')
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
