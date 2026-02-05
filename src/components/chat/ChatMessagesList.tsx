import { List } from '@chakra-ui/react'
import ChatBotMessage from './ChatBotMessage'
import ChatUserMessage from './ChatUserMessage'
import { useAuth } from '@/AuthContext'
import ChatMessage from '@/entities/ChatMessage'
import { useRef, useEffect, useState } from 'react'
import Host from '@/entities/Host'
import useMicReady from '@/helps/useMicReady'

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

  // useMicReady hook (extracted)
  const micReady = useMicReady(true)

  useEffect(() => {
    if (messages.length === 0) return

    const lastMsg = messages[messages.length - 1]
    setLastMessageId(lastMsg.id.toString())

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
          autoPlay={
            m.id.toString() === lastMessageId && !!m.audio && micReady
          } // only newest AI audio, and only if mic is ready
        />
      )}
      {/* 4)Add a dummy element at the end of ChatMessagesList */}
      <div ref={messagesEndRef}/>
    </List>
  )
}

export default ChatMessagesList