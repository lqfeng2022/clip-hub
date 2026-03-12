import { useAuth } from '@/AuthContext'
import { useEffect, useRef, useState } from 'react'
import useProductsLiked from './store/useProductsLiked'
import useInteractPost from './store/useInteractPost'

const useLikeManager = (
  productId: number, initialState: boolean, onUnmark?: () => void
) => {
  const { user } = useAuth()
  const [marked, setMarked] = useState(initialState)
  const toggleMarked = () => setMarked(prev => !prev)

  const lastState = useRef(initialState)
  const timer = useRef<number | null>(null)

  const { mutate } = useInteractPost(productId, 'like')
  const { refetch } = useProductsLiked()

  useEffect(() => {
    if (marked !== lastState.current) {
      // clear previous timeout if exists
      if (timer.current) clearTimeout(timer.current)

      timer.current = setTimeout(() => {
        if (user) 
          mutate({visible: marked}, {
            onSuccess: () => refetch()
          })
        lastState.current = marked
        // triggle refetch, toast, or redirect
        if (!marked && onUnmark) onUnmark()
      }, 500) // 0.5s is enough
    } 
  
    // React expects the cleanup function to be returned from useEffect
    return () => { 
      if (timer.current) clearTimeout(timer.current)
    }
  }, [marked, mutate, user, refetch, onUnmark])
  // Include all variables from the outer scope that are used inside the effect.

  return { marked, toggleMarked, user }
}

export default useLikeManager