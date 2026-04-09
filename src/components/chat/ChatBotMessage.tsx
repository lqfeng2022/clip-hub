import ChatMessage from '@/entities/ChatMessage'
import { HStack, Avatar, Stack } from '@chakra-ui/react'
import ChatAudioBoxBot from './ChatAudioBoxBot'
import TextMessageWithRewrite from './TextMessageWithRewrite'
import Host from '@/entities/Host'

interface Props {
  host: Host,
  message: ChatMessage,
  chatSessionId: number,
  autoPlay?: boolean //receive autoplay flag
}
const ChatBotMessage = ({ host, message, autoPlay, chatSessionId }: Props) => {  
  return (
    <HStack justify='flex-end'>
      <Stack>
        {message.audio ? (
          <ChatAudioBoxBot 
            audioUrl={message.audio!}
            content={message.content!}
            rewrite_content={message.rewrite?.content ?? undefined}
            duration={message.audio_seconds}
            messageId={message.id}
            chatSessionId={chatSessionId}
            align='right'
            autoPlay={autoPlay}
          />
        ) : (
          <TextMessageWithRewrite
            content={message.content!}
            rewrite_content={message.rewrite?.content ?? undefined}
            chatSessionId={chatSessionId}
            messageId={message.id}
            align='right'
          />
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