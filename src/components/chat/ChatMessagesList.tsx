import { List } from '@chakra-ui/react'
import ChatBotMessage from './ChatBotMessage'
import ChatUserMessage from './ChatUserMessage'
import { useAuth } from '@/AuthContext'
import ChatMessage from '@/entities/ChatMessage'
import { useRef, useEffect } from 'react'
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

  // 1)Add a ref to the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 2)scroll to bottom whenever messages changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  return (
    <List p={3} spacing={6}>
      {messages.map(m => m.role === 'user' ? 
        <ChatUserMessage key={m.id} fullName={fullName} message={m}/> : 
        <ChatBotMessage key={m.id} message={m} host={host}/>
      )}
      {/* 4)Add a dummy element at the end of ChatMessagesList */}
      <div ref={messagesEndRef}/>
    </List>
  )
}

export default ChatMessagesList