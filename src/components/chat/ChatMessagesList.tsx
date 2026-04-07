import { List, Text, Center, Box } from '@chakra-ui/react'
import ChatBotMessage from './ChatBotMessage'
import ChatUserMessage from './ChatUserMessage'
import { useAuth } from '@/AuthContext'
import ChatMessage from '@/entities/ChatMessage'
import { useEffect, useState } from 'react'
import Host from '@/entities/Host'
import { shouldShowDateDivider, formatDateTime } from '@/helps/chatDateUtils'

interface Props {
  host: Host
  messages: ChatMessage[]
  chatSessionId: number,
}
const ChatMessagesList = ({ host, messages, chatSessionId }: Props) => {
  const { user } = useAuth()

  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username

  // Track last message ID for autoplay logic
  const [lastMessageId, setLastMessageId] = useState<string | null>(null)
  const [initialMessageCount, setInitialMessageCount] = useState<number | null>(null)

  useEffect(() => {
    if (initialMessageCount === null && messages.length > 0) {
      setInitialMessageCount(messages.length)
    }
  }, [messages, initialMessageCount])

  useEffect(() => {
    if (messages.length === 0 || initialMessageCount === null) return

    const lastMsg = messages[messages.length - 1]
    if (
      messages.length > initialMessageCount &&
      lastMsg.role !== 'user' &&
      lastMsg.audio
    ) {
      setLastMessageId(lastMsg.id.toString())
    }
  }, [messages])

  return (
    <List p={3} spacing={10}>
      {messages.map((m, index) => {
        const prevMessage = messages[index - 1]
        
        const createdAt = prevMessage?.created_at ?? null

        const showDateDivider = shouldShowDateDivider(
          createdAt, m.created_at
        )

        const isLastOne = m.id.toString() === lastMessageId

        return (
          <Box key={m.id}>
            {showDateDivider && (
              <Center mb={3}>
                <Text fontSize='sm' color='gray.400'>
                  {formatDateTime(m.created_at, createdAt)}
                </Text>
              </Center>
            )}
            {m.role === 'user' ? 
              <ChatUserMessage 
                key={index} 
                fullName={fullName} 
                message={m} 
                chatSessionId={chatSessionId}
                autoPlay={false}
              /> 
            :
              <ChatBotMessage 
                key={index} 
                host={host} 
                message={m} 
                autoPlay={isLastOne && !!m.audio}
              />
            }
          </Box>
        )
      })}
    </List>
  )
}

export default ChatMessagesList