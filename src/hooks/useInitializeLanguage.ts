import { useEffect } from 'react'
import useLanguageStore from '@/stores/languageStore'
import { LANGUAGES } from '@/data/languages'

const useInitializeLanguage = () => {
  const { hasUserSelected, setLanguage } = useLanguageStore()

  useEffect(() => {
    if (hasUserSelected) return

    const browserLang = navigator.language.toLowerCase()

    const matched = LANGUAGES.find(
      (lang) =>
        !lang.disabled &&
        browserLang.startsWith(lang.code.toLowerCase())
    )

    if (matched) {
      setLanguage(matched.code)
    } else {
      setLanguage('en')
    }
  }, [hasUserSelected, setLanguage])
}

export default useInitializeLanguage