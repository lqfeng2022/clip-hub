import { Icon } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import Expression from '../entities/Expression'
import useEpInteract from '../hooks/useEpInteract'

interface Props {
  expression: Expression
}
const ExpressionBookmark = ({ expression }: Props) => {
  const [marked, setMarked] = useState(expression.bookmark_state)
  const toggleMarked = () => setMarked(prev => !prev)

  const lastState = useRef(expression.bookmark_state)
  const timer = useRef<number | null>(null)

  const { mutate } = useEpInteract(expression.id, 'epbook')

  useEffect(() => {
      if (marked !== lastState.current) {
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
          mutate({visible: marked})
          lastState.current = marked
        }, 1000)
      } 
  
      // React expects the cleanup function to be returned from useEffect
      return () => {
        if (timer.current) clearTimeout(timer.current)
      }
    }, [marked, mutate])

  return (
    <Icon
      as={marked ? IoBookmark : IoBookmarkOutline} // or IoBookmark
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
    />
  )
}

export default ExpressionBookmark