import { HStack, Icon, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import Clip from '../../entities/Clip'
import useInteract from '../../hooks/store/useClipInteract'
import { useAuth } from '../../AuthContext'

const ClipInteractIconLike = ({ clip }: { clip: Clip }) => {
    const { user } = useAuth()
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

    // `useRef()`: store value between renders
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
          if (user) mutate({ visible: liked }) // send like/unlike
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
        as={liked ? IoHeart : IoHeartOutline} 
        boxSize={6}
        onClick={toggleLike}
        _hover={{ cursor: 'pointer' }}
      />
      <Text>{likesCount}</Text>
    </HStack>
  )
}

export default ClipInteractIconLike