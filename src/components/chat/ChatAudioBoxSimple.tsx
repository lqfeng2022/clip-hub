import { formatDuration } from '@/helps/formatDate'
import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { RiStopFill } from 'react-icons/ri'
import AudioIcons from './AudioIcons'

const ChatAudioBoxSimple = ({ audioUrl}: { audioUrl: string}) => {
  const [duration, setDuration] = useState<number | null>(null)
  const formattedDuration = formatDuration(duration)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  const handlePlayClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <Box
      flexShrink={0}
      width='212px'
      height='40px'
      borderRadius='10px'
      background='gray.700'
      p='10px 15px'
    >
      <HStack spacing={5}>
        <Icon
          as={isPlaying ? RiStopFill : IoPlay}
          onClick={handlePlayClick}
          cursor='pointer'
          _hover={{ opacity: 0.7 }}
        />
        <Box 
          display='flex' 
          alignItems='center'
        >
          <AudioIcons/>
        </Box>
        <Text fontSize='sm'>{formattedDuration}</Text>
        <audio
          ref={audioRef}
          src={audioUrl}
          preload='metadata'
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={(e) =>
            setDuration(e.currentTarget.duration)
          }
        />
      </HStack>
    </Box>
  )
}

export default ChatAudioBoxSimple
