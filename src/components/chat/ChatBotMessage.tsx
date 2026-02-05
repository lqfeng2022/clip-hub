import ChatMessage from '@/entities/ChatMessage'
import { HStack, Box, Avatar, Text, Stack } from '@chakra-ui/react'
import ChatAudioBox from './ChatAudioBox'
import Host from '@/entities/Host'

interface Props {
  host: Host,
  message: ChatMessage,
  autoPlay?: boolean //receive autoplay flag
}
const ChatBotMessage = ({ host, message, autoPlay }: Props) => {
  const audio = message.audio
  
  return (
    <HStack justify='flex-end'>
      <Stack>
        {audio ? <ChatAudioBox 
          audioUrl={audio} 
          content={message.content!}
          align='right'
          autoPlay={autoPlay}
        />
          : <Box
            maxW={{base: '260px', sm: '300px'}}
            borderRadius='12px'
            background='gray.700'
            p='8px 15px'
          >
            <Text 
              lineHeight={1.4}
              fontSize={{base: 'sm', sm: 'md'}}
            >
              {message.content}
            </Text>
          </Box>
        }
      </Stack>
      <Avatar 
        size='small'
        alignSelf='flex-start' 
        src={host.portrait}
        opacity={0.8}
      />
    </HStack>
  )
}

export default ChatBotMessage