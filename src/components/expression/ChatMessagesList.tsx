import { List } from '@chakra-ui/react'
import ChatBotMessage from './ChatBotMessage'
import ChatUserMessage from './ChatUserMessage'
import { useAuth } from '@/AuthContext'
import ChatMessage from '@/entities/ChatMessage'

const ChatMessagesList = ({ messages }: {messages: ChatMessage[]}) => {
  const { user } = useAuth()
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username
    
  return (
    <List py={3} spacing={6}>
      {messages.map(m =>
        m.role === 'user'
          ? <ChatUserMessage key={m.id} fullName={fullName} message={m} />
          : <ChatBotMessage key={m.id} message={m} />
      )}
    </List>
  )
}

export default ChatMessagesList