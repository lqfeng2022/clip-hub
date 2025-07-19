import { useAuth } from '@/AuthContext'
import Expression from '@/entities/Expression'
import useEpbooks from '@/hooks/interact/useEpbooks'
import useEpInteract from '@/hooks/store/useEpInteract'
import { Icon } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'

interface Props {
  detail: boolean,
  expression: Expression,
  onUnmark?: () => void, // optional callback
}
const ExpressionBookmark = ({ detail, expression, onUnmark }: Props) => {
  const { user } = useAuth()
  const [marked, setMarked] = useState(expression.bookmark_state)
  const toggleMarked = () => setMarked(prev => !prev)

  const lastState = useRef(expression.bookmark_state)
  const timer = useRef<number | null>(null)

  const { mutate } = useEpInteract(expression.id, 'epbook')
  const { refetch } = useEpbooks()

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
    return () => { if (timer.current) clearTimeout(timer.current)}
  }, [marked, mutate])

  if (!user) return null
  return (
    <>
      {detail === true ? (
        <Icon
          as={marked ? IoHeart : IoHeartOutline} // or IoBookmark
          boxSize={6}
          color={marked ? 'yellow' : ''}
          cursor='pointer'
          _hover={{ color: 'yellow.300' }}
          onClick={toggleMarked}
        />) : (
        <Icon
          as={marked ? IoHeart : IoHeartOutline} // or IoBookmark
          boxSize={7}
          color={marked ? 'yellow' : ''}
          position='absolute'
          top={1}
          right={1}
          bg='rgba(0,0,0,0.4)'
          borderRadius='full'
          p={1}
          cursor='pointer'
          _hover={{ color: 'yellow.300' }}
          onClick={toggleMarked}
        />)
      }
    </>
  )
}

export default ExpressionBookmark