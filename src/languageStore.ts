import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LanguageStore {
  language: string,
  setLanguage: (language: string) => void,
}

const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage', // key in localStorage
    }
  )
)

export default useLanguageStore