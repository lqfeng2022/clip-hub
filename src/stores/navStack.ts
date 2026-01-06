import { create } from 'zustand'

interface NavStackState {
  stack: string[]
  push: (path: string) => void
  pop: () => string | null
}

const useNavStack = create<NavStackState>((set, get) => ({
  stack: [],

  push: (path) => set((s) => (
    { stack: [...s.stack, path] })
  ),

  pop: () => {
    const s = get().stack
    if (s.length <= 1) return null  // nothing to pop

    const newStack = s.slice(0, -1)
    const last = s[s.length - 2]    // previous url
    set({ stack: newStack })
    return last
  },
}))

export default useNavStack