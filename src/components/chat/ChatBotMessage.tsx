import ChatMessage from '@/entities/ChatMessage'
import { HStack, Box, Avatar, Text, Stack } from '@chakra-ui/react'
import ChatAudioBox from './ChatAudioBox'
import Host from '@/entities/Host'

interface Props {
  host: Host,
  message: ChatMessage,
}
const ChatBotMessage = ({ host, message }: Props) => {
  const audio = message.audio
  
  return (
    <HStack justify='flex-end'>
      <Stack>
        {audio ? <ChatAudioBox 
          audioUrl={audio} 
          content={message.content!}
          align='right'
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
        size='sm'
        alignSelf='flex-start' 
        mt={1} 
        src={host.portrait}
        opacity={0.8}
      />
    </HStack>
  )
}

export default ChatBotMessage