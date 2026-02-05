import { formatDuration } from '@/helps/formatDate'
import { Box, Collapse, HStack, Icon, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { RiStopFill } from 'react-icons/ri'
import AudioIcons from './AudioIcons'

interface Props {
  audioUrl: string,
  content?: string,
  align?: 'left' | 'right',
  autoPlay?: boolean // new prop
}
const ChatAudioBox = ({ audioUrl, content, align = 'left', autoPlay = false }: Props) => {
  const [duration, setDuration] = useState<number | null>(null)
  const formattedDuration = formatDuration(duration)
  
  const [showContent, setShowContent] = useState(false)
  
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

  // Autoplay only for new AI audio
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // autoplay blocked or error → manual fallback
        })
    }
  }, [audioUrl, autoPlay])

  return (
    <Box 
      display='flex' 
      flexDirection='column' 
      alignItems={align === 'right' ? 'flex-end' : 'flex-start'}
      overflow='visible'
    >
      {/* audio bar - fixed, doesn't shrink */}
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
            cursor={content ? 'pointer' : 'default'}
            _hover={content ? {color: 'yellow.300'} : undefined}
            onClick={() => setShowContent(!showContent)}
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
      {/* show the audio content */}
      <Collapse in={showContent && !!content} animateOpacity>
        <Box 
          width={{ base: '280px', sm: '350px' }} 
          pt={2}
        >
          <Text
            fontWeight='light'
            lineHeight='1.3'
            fontSize={{ base: 'xs', sm: 'sm' }}
          >
            {content}
          </Text>
        </Box>
      </Collapse>
    </Box>
  )
}

export default ChatAudioBox
