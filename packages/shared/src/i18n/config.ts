export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'] as const

export const LANGUAGES = {
  'zh-CN': { name: '简体中文', dir: 'ltr' as const },
  en: { name: 'English', dir: 'ltr' as const },
  ar: { name: 'العربية', dir: 'rtl' as const },
  he: { name: 'עברית', dir: 'rtl' as const },
} as const

export type LanguageCode = keyof typeof LANGUAGES
export type Direction = 'ltr' | 'rtl'

export const DEFAULT_LANGUAGE: LanguageCode = 'zh-CN'

export const isRTLLanguage = (lang: string): boolean => {
  return RTL_LANGUAGES.includes(lang as any)
}

export const getLanguageDirection = (lang: string): Direction => {
  return isRTLLanguage(lang) ? 'rtl' : 'ltr'
}
