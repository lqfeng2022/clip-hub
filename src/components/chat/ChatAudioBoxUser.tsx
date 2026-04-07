import { audioManager } from '@/helps/audioManager'
import { formatDuration } from '@/helps/formatDate'
import { Box, Button, Collapse, HStack, Icon, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoPlay } from 'react-icons/io5'
import { RiStopFill } from 'react-icons/ri'
import AudioIcons from './AudioIcons'
import { formatMessage } from '@/helps/formatMessage'
import useChatMessageRewrite from '@/hooks/interact-chat/useChatMessageRewrite'

interface Props {
  audioUrl: string,
  content?: string,
  rewrite_content?: string,
  duration: number | null,
  align?: 'left' | 'right',
  autoPlay?: boolean,
  chatSessionId: number,
  messageId: number,
}
const ChatAudioBoxUser = ({ 
  audioUrl, 
  content, 
  rewrite_content,
  duration,
  align = 'left', 
  autoPlay = false,
  chatSessionId,
  messageId,
}: Props) => {
  // duration on local (from audio element metadata)
  const [seconds, setSeconds] = useState<number | null>(null)
  
  const { mutate: rewriteMessage, isLoading } = useChatMessageRewrite(chatSessionId, messageId)

  // always use backend duration for display
  const displaySeconds: number | null = (
    typeof duration === 'number' && Number.isFinite(duration) && duration > 0 
      ? duration : null
  )

  const [showContent, setShowContent] = useState(false)
  const [viewingRewrite, setViewingRewrite] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [localRewrite, setLocalRewrite] = useState<string | null>(rewrite_content || null)
  
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
            {formatDuration(displaySeconds ?? seconds)}
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
      <Collapse in={showContent && (!!content || !!localRewrite)} animateOpacity>
        <Box 
          width={{ base: '280px', sm: '350px' }} 
          pt={2} mt={2} 
          background='RGBA(0, 0, 0, 0.22)' 
          borderRadius='5px'
        >
          <Text 
            fontWeight='light' 
            lineHeight='1.3' 
            fontSize='xs'
            px={2}
          >
            {formatMessage(
              viewingRewrite && localRewrite ? localRewrite : content ?? localRewrite ?? ''
            )}
          </Text>
          <Box p={2}>
            {localRewrite ? (
              <Button 
                size='xs'
                variant='outline'
                _hover={{background: 'yellow.800'}}
                onClick={() => setViewingRewrite(!viewingRewrite)}
              >
                {viewingRewrite ? 'View Original' : 'View Rewrite'}
              </Button>
            ) : (
              <Button 
                size='xs'
                variant='outline'
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={() => rewriteMessage(undefined, {
                  onSuccess: (data) => {
                    if (data?.content) {
                      setLocalRewrite(data.content)
                      setViewingRewrite(true)
                      setShowContent(true)
                    }
                  },
                })}
              >
                Rewrite
              </Button>
            )}
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default ChatAudioBoxUser
