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
}
const ChatMessagesList = ({ host, messages }: Props) => {
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
    <List p={3} spacing={6}>
      {messages.map((m, index) => {
        const prevMessage = messages[index - 1]

        const showDateDivider = shouldShowDateDivider(
          prevMessage?.created_at ?? null,
          m.created_at
        )

        return (
          <Box key={m.id}>
            {showDateDivider && (
              <Center mb={3}>
                <Text fontSize='sm' color='gray.400'>
                  {formatDateTime(m.created_at, prevMessage?.created_at ?? null)}
                </Text>
              </Center>
            )}

            {m.role === 'user' ? (
              <ChatUserMessage
                key={m.id}
                fullName={fullName}
                message={m}
                autoPlay={false}
              />
            ) : (
              <ChatBotMessage
                key={m.id}
                message={m}
                host={host}
                autoPlay={m.id.toString() === lastMessageId && !!m.audio}
              />
            )}
          </Box>
        )
      })}
    </List>
  )
}

export default ChatMessagesList