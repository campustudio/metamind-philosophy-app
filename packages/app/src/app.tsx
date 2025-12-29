import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { useDidShow, useDidHide } from '@tarojs/taro'
import { store } from './store'
import './i18n'
import './app.scss'

function App(props) {
  useDidShow(() => {
    console.log('App launched.')
  })

  useDidHide(() => {
    console.log('App entered background.')
  })

  useEffect(() => {}, [])

  return <Provider store={store}>{props.children}</Provider>
}

export default App
