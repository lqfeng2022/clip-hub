import { Icon } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import useInteract from '../../hooks/useInteract'
import Clip from '../../entities/Clip'

interface Props {
  clip: Clip
}
const InteractBookmark = ({ clip }: Props) => {
  const [marked, setMarked] = useState(clip.bookmark_state)
  const toggleMarked = () => setMarked(prev => !prev)
  
  const lastState = useRef(clip.bookmark_state)
  const timer = useRef<number | null>(null)
  
  const { mutate } = useInteract(clip.id, 'bookmark')

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
      as={marked ? IoBookmark : IoBookmarkOutline}
      boxSize={6}
      onClick={toggleMarked}
    />
  )
}

export default InteractBookmark