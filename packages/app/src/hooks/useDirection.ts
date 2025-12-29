import { useTranslation } from 'react-i18next'
import { RTL_LANGUAGES } from '@yuansixiang/shared'

export const useDirection = () => {
  const { i18n } = useTranslation()
  const isRTL = RTL_LANGUAGES.includes(i18n.language as any)
  
  return {
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr',
  } as const
}
