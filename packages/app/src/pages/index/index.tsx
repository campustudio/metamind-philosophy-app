import { View, Text } from '@tarojs/components'
import { useTranslation } from 'react-i18next'
import { Button } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import { useAppSelector } from '@/store'
import './index.scss'

export default function Index() {
  const { t } = useTranslation()
  const { currentUser } = useAppSelector(state => state.user)

  const handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index',
    })
  }

  const handleExplore = () => {
    Taro.showToast({
      title: '功能开发中',
      icon: 'none',
    })
  }

  return (
    <View className="index-page">
      <View className="header">
        <View className="logo-container">
          <Text className="logo-text">元思想</Text>
          <Text className="tagline">智慧成长，思想陪伴</Text>
        </View>
      </View>

      <View className="content">
        {currentUser ? (
          <View className="user-card">
            <Text className="welcome-text">欢迎回来</Text>
            <Text className="user-name">{currentUser.nickname || currentUser.phone}</Text>
          </View>
        ) : (
          <View className="welcome-card">
            <Text className="welcome-title">开启你的学习之旅</Text>
            <Text className="welcome-desc">探索知识的海洋，与思想同行</Text>
          </View>
        )}

        <View className="feature-grid">
          <View className="feature-item">
            <View className="feature-icon">📚</View>
            <Text className="feature-title">课程学习</Text>
            <Text className="feature-desc">精选优质课程</Text>
          </View>

          <View className="feature-item">
            <View className="feature-icon">🎯</View>
            <Text className="feature-title">学习路径</Text>
            <Text className="feature-desc">个性化推荐</Text>
          </View>

          <View className="feature-item">
            <View className="feature-icon">💬</View>
            <Text className="feature-title">思想论坛</Text>
            <Text className="feature-desc">交流与分享</Text>
          </View>

          <View className="feature-item">
            <View className="feature-icon">🤖</View>
            <Text className="feature-title">AI 助手</Text>
            <Text className="feature-desc">智能问答</Text>
          </View>
        </View>
      </View>

      <View className="actions">
        {!currentUser && (
          <Button type="primary" className="action-btn primary-btn" onClick={handleLogin}>
            立即登录
          </Button>
        )}
        <Button type="default" className="action-btn secondary-btn" onClick={handleExplore}>
          探索更多
        </Button>
      </View>
    </View>
  )
}
