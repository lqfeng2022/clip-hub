import english from '@/assets/languages/usa.png'
import traditionalChinese from '@/assets/languages/china.png' 
import simplifiedChinese from '@/assets/languages/china-2.png' 
import french from '@/assets/languages/french.png'
import japanese from '@/assets/languages/japan.png'
import german from '@/assets/languages/germany.svg'
import spanish from '@/assets/languages/spain.svg'
import portugal from '@/assets/languages/portugal.png'
import arabic from '@/assets/languages/arabic.svg'
import russian from '@/assets/languages/russia.png'

export interface LanguageOption {
  title: string
  code: string
  nativeLabel: string
  icon: string
  disabled: boolean
}

export type LanguageCode = typeof LANGUAGES[number]['code']

export const LANGUAGES = [
  {
    title: 'English',
    code: 'en',
    nativeLabel: 'English',
    icon: english,
    disabled: false,
  },
  {
    title: 'Simplified Chinese',
    code: 'zh-CN',
    nativeLabel: '简体中文',
    icon: simplifiedChinese,
    disabled: false,
  },
  {
    title: 'Traditional Chinese',
    code: 'zh-TW',
    nativeLabel: '繁體中文',
    icon: traditionalChinese,
    disabled: true,
  },
  {
    title: 'French',
    code: 'fr',
    nativeLabel: 'Français',
    icon: french,
    disabled: true,
  },
  {
    title: 'Japanese',
    code: 'ja',
    nativeLabel: '日本語',
    icon: japanese,
    disabled: true,
  },
  {
    title: 'German',
    code: 'de',
    nativeLabel: 'Deutsch',
    icon: german,
    disabled: true,
  },
  {
    title: 'Spanish',
    code: 'es',
    nativeLabel: 'Español',
    icon: spanish,
    disabled: true,
  },
  {
    title: 'Portuguese',
    code: 'pt',
    nativeLabel: 'Português',
    icon: portugal,
    disabled: true,
  },
  {
    title: 'Arabic',
    code: 'ar',
    nativeLabel: 'العربية',
    icon: arabic,
    disabled: true,
  },
  {
    title: 'Russian',
    code: 'ru',
    nativeLabel: 'Русский',
    icon: russian,
    disabled: true,
  },
] as const