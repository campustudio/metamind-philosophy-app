import { useState } from 'react'
import { View } from '@tarojs/components'
import { useTranslation } from 'react-i18next'
import { Button, Input, Toast } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import { useAppDispatch } from '@/store'
import { login } from '@/store/slices/authSlice'
import { setUser } from '@/store/slices/userSlice'
import { loginSchema } from '@yuansixiang/shared'
import './index.scss'

export default function Login() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ phone, code })
    
    if (!result.success) {
      const errors = result.error.errors.map(e => e.message).join(', ')
      Toast.show(errors)
      return
    }

    setLoading(true)
    try {
      const response = await dispatch(login({ phone, code })).unwrap()
      dispatch(setUser(response.user))
      Toast.show(t('common:message.success'))
      
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/index/index' })
      }, 500)
    } catch (error: any) {
      Toast.show(error || t('auth:error.loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="login-page">
      <View className="login-container">
        <View className="text-3xl font-bold text-center mb-8">
          {t('auth:login.title')}
        </View>

        <View className="mb-4">
          <Input
            placeholder={t('auth:login.phonePlaceholder')}
            type="tel"
            value={phone}
            onChange={setPhone}
          />
        </View>

        <View className="mb-6">
          <Input
            placeholder={t('auth:login.codePlaceholder')}
            type="number"
            maxLength={6}
            value={code}
            onChange={setCode}
          />
        </View>

        <Button
          type="primary"
          block
          loading={loading}
          onClick={handleLogin}
        >
          {t('auth:login.loginButton')}
        </Button>
      </View>
    </View>
  )
}
