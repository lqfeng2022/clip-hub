import { LanguageCode } from '@/data/languages'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LanguageStore {
  language: LanguageCode
  hasUserSelected: boolean
  setLanguage: (language: LanguageCode, manual?: boolean) => void,
}

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      hasUserSelected: false,
      setLanguage: (language, manual = false) => 
        set({ 
          language,
          hasUserSelected: manual ? true : false,
        }),
    }),
    {
      name: 'language-storage', // key in localStorage
    }
  )
)

export default useLanguageStore