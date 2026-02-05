import { List } from '@chakra-ui/react'
import ChatBotMessage from './ChatBotMessage'
import ChatUserMessage from './ChatUserMessage'
import { useAuth } from '@/AuthContext'
import ChatMessage from '@/entities/ChatMessage'
import { useRef, useEffect, useState } from 'react'
import Host from '@/entities/Host'

interface Props {
  host: Host,
  messages: ChatMessage[]
}
const ChatMessagesList = ({ host, messages }: Props) => {
  const { user } = useAuth()

  const fullName = user?.first_name || user?.last_name
  ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
  : user?.username

  // Add a ref to the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Track last message ID for autoplay logic
  const [lastMessageId, setLastMessageId] = useState<string | null>(null)
  const [initialMessageCount, setInitialMessageCount] = useState<number | null>(null)

  useEffect(() => {
    // On mount, record how many messages existed
    if (initialMessageCount === null && messages.length > 0) {
      setInitialMessageCount(messages.length)
    }
  }, [messages, initialMessageCount])

  useEffect(() => {
    if (messages.length === 0 || initialMessageCount === null) return

    const lastMsg = messages[messages.length - 1]

    // Only autoplay if message count increased (new message arrived)
    // AND it's an AI message with audio
    if (
      messages.length > initialMessageCount && 
      lastMsg.role !== 'user' && 
      lastMsg.audio
    ) {
      setLastMessageId(lastMsg.id.toString())
    }

    // scroll to bottom whenever messages changes
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  return (
    <List p={3} spacing={6}>
      {messages.map(m => m.role === 'user' ? 
        <ChatUserMessage 
          key={m.id} 
          fullName={fullName} 
          message={m}
          autoPlay={false} // user audio never autoplay
        /> : 
        <ChatBotMessage 
          key={m.id} 
          message={m} 
          host={host}
          // only newest AI audio
          autoPlay={m.id.toString() === lastMessageId && !!m.audio} 
        />
      )}
      {/* Add a dummy element at the end of ChatMessagesList */}
      <div ref={messagesEndRef}/>
    </List>
  )
}

export default ChatMessagesList