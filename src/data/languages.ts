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

export default {
  count: 10, 
  content: [
    { 
      title: 'English', 
      trans: '', 
      
      code: 'en', 
      icon: english, 
      disabled: false
    }, 
    { 
      title: 'Simplified Chinese', 
      code: 'zh', 
      trans: '简体中文', 
      icon: simplifiedChinese, 
      disabled: false
    }, 
    { 
      title: 'Traditional Chinese', 
      code: 'ch', 
      trans: '繁體中文', 
      icon: traditionalChinese, 
      disabled: true
    }, 
    { 
      title: 'French', 
      code: 'fr', 
      trans: 'Français', 
      icon: french, 
      disabled: true
    }, 
    { 
      title: 'Japanese', 
      code: 'ja', 
      trans: '日本語', 
      icon: japanese, 
      disabled: true
    }, 
    { 
      title: 'German', 
      code: 'ge', 
      trans: 'German', 
      icon: german, 
      disabled: true
    }, 
    { 
      title: 'Spanish', 
      code: 'sp', 
      trans: 'Español', 
      icon: spanish, 
      disabled: true
    }, 
    { 
      title: 'Portugal', 
      code: 'po', 
      trans: 'Portugal', 
      icon: portugal, 
      disabled: true
    }, 
    { 
      title: 'Arabic', 
      code: 'ar', 
      trans: 'العربية', 
      icon: arabic, 
      disabled: true
    }, 
    { 
      title: 'Russian', 
      code: 'ru', 
      trans: 'Русский', 
      icon: russian, 
      disabled: true
    }, 
  ]
}