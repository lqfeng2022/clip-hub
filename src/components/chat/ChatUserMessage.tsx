import ChatMessage from '@/entities/ChatMessage'
import { HStack, Avatar, Box, Text } from '@chakra-ui/react'
import ChatAudioBox from './ChatAudioBox'
import { formatMessage } from '@/helps/formatMessage'

interface Props {
  fullName: string | undefined,
  message: ChatMessage,
  chatSessionId: number,
  autoPlay?: boolean // never true for user
}
const ChatUserMessage = ({ fullName, message, chatSessionId }: Props) => {
  return (
    <HStack>
      <Avatar 
        alignSelf='flex-start'
        size='small'
        opacity={0.8}
        name={fullName}
      />
      {message.audio ? (
        <ChatAudioBox 
          audioUrl={message.audio!} 
          content={message.content!}
          rewrite_content={message.rewrite?.content ?? undefined}
          duration={message.audio_seconds}
          messageId={message.id}
          chatSessionId={chatSessionId}
          autoPlay={false} // user audio always manual
        />
      ): (
        <Box 
          maxW={{base: '260px', sm: '350px'}}
          borderRadius='12px' 
          background='RGBA(0, 0, 0, 0.22)'
          p='8px 15px'
        >
          <Text 
            color='gray.100' 
            lineHeight={1.4}
            fontSize={{base: '0.8em', sm: 'sm'}}
          >
            {formatMessage(message.content!)}
          </Text>
        </Box>
      )}
    </HStack>
  )
}

export default ChatUserMessage