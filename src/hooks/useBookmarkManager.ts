import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/AuthContext'
import { useQueryClient } from '@tanstack/react-query'

const useBookmarkManager = (initialState: boolean) => {
  const { user } = useAuth()
  const [bookmarked, setBookmarked] = useState(initialState)

  const last = useRef(initialState)
  const timer = useRef<number | null>(null)

  const qc = useQueryClient()

  const toggle = () => setBookmarked(prev => !prev)

  useEffect(() => {
    if (bookmarked === last.current) return
    if (timer.current) clearTimeout(timer.current)

    timer.current = window.setTimeout(() => {
      if (!user) return

      // invalidate bookmark + lists page
      qc.invalidateQueries({ queryKey: ['lists'] })
      qc.invalidateQueries({ queryKey: ['bookmarks'] })
      last.current = bookmarked
    }, 300)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [bookmarked, user, qc])

  return { bookmarked, setBookmarked, toggle }
}

export default useBookmarkManager