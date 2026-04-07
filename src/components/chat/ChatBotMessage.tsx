import ChatMessage from '@/entities/ChatMessage'
import { HStack, Box, Avatar, Text, Stack } from '@chakra-ui/react'
import ChatAudioBoxBot from './ChatAudioBoxBot'
import Host from '@/entities/Host'
import { formatMessage } from '@/helps/formatMessage'

interface Props {
  host: Host,
  message: ChatMessage,
  autoPlay?: boolean //receive autoplay flag
}
const ChatBotMessage = ({ host, message, autoPlay }: Props) => {  
  return (
    <HStack justify='flex-end'>
      <Stack>
        {message.audio ? (
          <ChatAudioBoxBot 
            audioUrl={message.audio!}
            content={message.content!}
            duration={message.audio_seconds}
            align='right'
            autoPlay={autoPlay}
          />
        ) : (
          <Box
            maxW={{base: '260px', sm: '350px'}}
            borderRadius='12px'
            background='gray.700'
            p='8px 15px'
          >
            <Text 
              lineHeight={1.4}
              fontSize={{base: '0.8em', sm: 'sm'}}
              whiteSpace='pre-wrap' // handle `\n` and `\n\n`
            >
              {formatMessage(message.content!)}
            </Text>
          </Box>
        )}
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