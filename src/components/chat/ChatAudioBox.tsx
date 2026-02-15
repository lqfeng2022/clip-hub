import { audioManager } from '@/helps/audioManager'
import { formatDuration } from '@/helps/formatDate'
import { Box, Collapse, HStack, Icon, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { RiStopFill } from 'react-icons/ri'
import AudioIcons from './AudioIcons'
import { formatMessage } from '@/helps/formatMessage'

interface Props {
  audioUrl: string,
  content?: string,
  duration: number | null,
  align?: 'left' | 'right',
  autoPlay?: boolean // new prop
}
const ChatAudioBox = ({ 
  audioUrl, 
  content, 
  duration,
  align = 'left', 
  autoPlay = false,
}: Props) => {
  // duration on local (from audio element metadata)
  const [seconds, setSeconds] = useState<number | null>(null)

  // prefer local `seconds` when available, otherwise fall back to backend `duration`
  const displaySeconds: number | null = (
    seconds != null && Number.isFinite(seconds) && seconds > 0
  ) ? seconds : (
    typeof duration === 'number' && Number.isFinite(duration) && duration > 0 ? duration : null
  )

  const [showContent, setShowContent] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  const handlePlayClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioManager.pause(audioRef.current)
        setIsPlaying(false)
      } else {
        audioManager.play(audioRef.current)
        setIsPlaying(true)
      }
    }
  }

  // Autoplay only for new AI audio
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioManager.play(audioRef.current)
      setIsPlaying(true)
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
          <Text fontSize='sm'>
            {formatDuration(displaySeconds)}
          </Text>
          <audio
            ref={audioRef}
            src={audioUrl}
            preload='metadata'
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            // set local duration
            onLoadedMetadata={(e) => {
              const d = e.currentTarget.duration
              if (Number.isFinite(d) && d > 0) setSeconds(d)
            }}
          />
        </HStack>
      </Box>
      {/* show the audio content */}
      <Collapse in={showContent && !!content} animateOpacity>
        <Box width={{ base: '280px', sm: '350px' }} pt={2}>
          <Text fontWeight='light' lineHeight='1.3' fontSize='xs'>
            {formatMessage(content!)}
          </Text>
        </Box>
      </Collapse>
    </Box>
  )
}

export default ChatAudioBox
