import { Icon } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoIosBookmark } from 'react-icons/io'
import Clip from '../entities/Clip'
import useInteract from '../hooks/useInteract'

interface Props {
  clip: Clip
}
const InteractBookmark = ({ clip }: Props) => {
  const [marked, setMarked] = useState(clip.bookmark_state)
  const toggleMarked = () => setMarked(prev => !prev)
  const { mutate } = useInteract(clip.id, 'bookmark')

  const lastState = useRef(clip.bookmark_state)
  const timer = useRef<number | null>(null)

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
      as={IoIosBookmark}
      boxSize={6}
      color={marked ? 'green.300' : ''}
      onClick={toggleMarked}
    />
  )
}

export default InteractBookmark