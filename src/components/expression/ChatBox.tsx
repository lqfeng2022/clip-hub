import { useAuth } from '@/AuthContext'
import ChatMessage from '@/entities/ChatMessage'
import Expression from '@/entities/Expression'
import useChatSessionDelete from '@/hooks/interact/useChatSessionDelete'
import useChatSessionPost from '@/hooks/interact/useChatSessionPost'
import useChatSession from '@/hooks/store/useChatSession'
import { Box, Button, Collapse, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import BeatLoader from '../BeatLoader'
import ChatBotDleteModal from './ChatBotDleteModal'
import ChatBoxForm from './ChatBoxForm'
import ChatBoxHeader from './ChatBoxHeader'
import ChatMessagesList from './ChatMessagesList'

interface Props {
  expression: Expression,
  extend: boolean,
  setExtend: () => void,
}
const ChatBox = ({ expression, extend, setExtend }: Props) => {
  const { isAuthenticated } = useAuth()
    
  // GET chat session
  const { data: chatSessions, isLoading, error, refetch} = useChatSession(
    expression.id.toString(), 
    isAuthenticated // only fetch when logged in
  )
  const chatSession = chatSessions?.results[0]

  // set a local empty STATE `messages`, then put the chatMessages to it once
  const [messages, setMessages] = useState<ChatMessage[]>([])
  useEffect(() => {
    if (chatSession && messages.length === 0) 
      setMessages(chatSession.messages)
  }, [chatSession])

  // POST chatSession if it didn't exit
  const { mutate: postChatSession } = useChatSessionPost(expression.id, 'chatsession')
  const handlePost = () => {
    postChatSession({}, { onSuccess: () => refetch()})
  }
  
  // Delete chatSession
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutate: deleteChat } = useChatSessionDelete()
  const handleDeleteChat = (sessionId: number) => {
    deleteChat({sessionId}, { 
      onSuccess: () => {
        setMessages([]) // only clear if deletion succeeds
        refetch()
      } 
    })
  }

  if (error) return null

  return (
    <Box margin='20px 2px 20px' borderRadius='10px' background='gray.700'>
      {!isAuthenticated && <ChatBoxHeader extend={extend} setExtend={setExtend}/>}
      {isAuthenticated && <Box p={3}>
        <Collapse in={extend} startingHeight='78px'>
          <ChatBoxHeader extend={extend} setExtend={setExtend}/>
          {chatSession?.messages.length !== 0 && isLoading && <BeatLoader/>}
          {!chatSession 
            ? <Button my={3} size='sm' onClick={handlePost}>Start a chat</Button>
            : (<Box>
              <ChatMessagesList messages={messages}/>
              <ChatBoxForm
                chatSession={chatSession}
                setMessages={setMessages}
                onClear={onOpen}
                disabledClear={messages.length === 0}
              />
              <ChatBotDleteModal
                isOpen={isOpen}
                onClose={onClose}
                onDelete={() => handleDeleteChat(chatSession.id)}
              />
            </Box>) 
          }
        </Collapse>
        {extend && <Button size='sm' variant='ghost' onClick={setExtend}>
          show lesss
        </Button>}
      </Box>}
    </Box>
  )
}

export default ChatBox