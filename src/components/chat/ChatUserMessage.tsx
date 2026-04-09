import ChatMessage from '@/entities/ChatMessage'
import { HStack, Avatar } from '@chakra-ui/react'
import ChatAudioBoxUser from './ChatAudioBoxUser'
import TextMessageWithRewrite from './TextMessageWithRewrite'

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
        <ChatAudioBoxUser 
          audioUrl={message.audio!} 
          content={message.content!}
          rewrite_content={message.rewrite?.content ?? undefined}
          duration={message.audio_seconds}
          messageId={message.id}
          chatSessionId={chatSessionId}
          autoPlay={false} // user audio always manual
        />
      ): (
        <TextMessageWithRewrite
          content={message.content!}
          rewrite_content={message.rewrite?.content ?? undefined}
          chatSessionId={chatSessionId}
          messageId={message.id}
          align='left'
        />
      )}
    </HStack>
  )
}

export default ChatUserMessage