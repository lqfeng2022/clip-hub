import { useAuth } from '@/AuthContext'
import { useEffect, useRef, useState } from 'react'
import useFollowPost from './store/useFollowPost'
import useFollowedHosts from './store/useFollowedHosts'

const useFollowManager = (
  hostId: number, initialState: boolean, onUnmark?: () => void
) => {
  const { user } = useAuth()
  const [marked, setMarked] = useState(initialState)
  const toggleMarked = () => setMarked(prev => !prev)

  const lastState = useRef(initialState)
  const timer = useRef<number | null>(null)

  const { mutate } = useFollowPost(hostId, 'follow')
  const { refetch } = useFollowedHosts()

  useEffect(() => {
    if (marked !== lastState.current) {
      if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
      if (user) 
        mutate({visible: marked}, {onSuccess: () => refetch()})
      lastState.current = marked
      // Use to triggle refetch, toast, or redirect
      if (!marked && onUnmark) onUnmark()
      }, 1000)
    } 
  
    // React expects the cleanup function to be returned from useEffect
    return () => { 
      if (timer.current) clearTimeout(timer.current)
    }
  }, [marked, mutate, user, refetch, onUnmark])
  // Include all variables from the outer scope that are used inside the effect.

  return { marked, toggleMarked, user }
}

export default useFollowManager