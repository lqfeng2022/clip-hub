import { HStack, Icon, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoIosHeart } from 'react-icons/io'
import Clip from '../../entities/Clip'
import useInteract from '../../hooks/useInteract'

interface Props {
  clip: Clip
}
const InteractLike = ({clip}: Props) => {
    const [liked, setLiked] = useState(clip.like_state)
    const [likesCount, setLikesCount] = useState(clip.likes_count)
    const toggleLike = () => {
      setLiked(prev => !prev)
      setLikesCount(count => liked ? count - 1 : count + 1)
    }

    // logic:
    // •	You start a 10s timer to send the request
	  // •	But the user clicks again before 10s is up
	  // •	You want to cancel the old timer and start a new one

    const { mutate } = useInteract(clip.id, 'like')

    // `useRef()`: Stores a value between renders
    const lastSentState = useRef(clip.like_state)
    const debounceTimer = useRef<number | null>(null)

    useEffect(() => {
      if (liked !== lastSentState.current) {
        // clear any previous debounce timer
        // `clearTimeout`: Cancels the pending request timer
        if (debounceTimer.current) clearTimeout(debounceTimer.current)

        // debounce for 10s before sending
        // `setTimeout()`: Delays the POST request until user stops clicking
        debounceTimer.current = setTimeout(() => {
          mutate({ visible: liked }) // send like/unlike
          lastSentState.current = liked
        }, 10000)
      }

      return () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
      }
    }, [liked, mutate])

  return (        
    <HStack>
      <Icon 
        as={IoIosHeart} 
        boxSize={6} 
        color={liked ? 'pink.300' : ''} 
        onClick={toggleLike}
      />
      <Text>{likesCount}</Text>
    </HStack>
  )
}

export default InteractLike