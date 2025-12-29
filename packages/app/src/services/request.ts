import Taro from '@tarojs/taro'
import type { ApiResponse } from '@yuansixiang/shared'
import { API_BASE_URL } from '@yuansixiang/shared'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
}

export async function request<T = any>(options: RequestOptions): Promise<T> {
  const { url, method = 'GET', data, header = {} } = options

  const token = Taro.getStorageSync('token')
  if (token) {
    header['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await Taro.request({
      url: `${API_BASE_URL}${url}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...header,
      },
    })

    const result = response.data as ApiResponse<T>

    if (result.code === 0 || response.statusCode === 200) {
      return result.data as T
    } else {
      throw new Error(result.message || '请求失败')
    }
  } catch (error: any) {
    if (error.statusCode === 401) {
      Taro.removeStorageSync('token')
      Taro.removeStorageSync('user')
      Taro.reLaunch({ url: '/pages/login/index' })
    }
    throw error
  }
}

export const get = <T = any>(url: string, data?: any) =>
  request<T>({ url, method: 'GET', data })

export const post = <T = any>(url: string, data?: any) =>
  request<T>({ url, method: 'POST', data })

export const put = <T = any>(url: string, data?: any) =>
  request<T>({ url, method: 'PUT', data })

export const del = <T = any>(url: string, data?: any) =>
  request<T>({ url, method: 'DELETE', data })
