import BeatLoader from '@/components/BeatLoader'
import ChatInputForm from '@/components/chat/ChatInputForm'
import ChatMessagesList from '@/components/chat/ChatMessagesList'
import ChatSessionCardSimple from '@/components/chat/ChatSessionCardSimple'
import PageNavTab from '@/components/PageNavTab'
import ChatMessage from '@/entities/ChatMessage'
import useChatSession from '@/hooks/interact/useChatSession'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ChatDetailPage = () => {
  const { id } = useParams() // get `id` from url
  const { data: chat, error, isLoading } = useChatSession(id!)
  const product = chat?.product
  const chatMessages = chat?.messages

  // set a local empty STATE `messages`, then put the chatMessages to it once
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // Initialize messages once
  useEffect(() => {
    if (chatMessages && messages.length === 0) 
      setMessages(chatMessages)
  }, [chatMessages])

  if (isLoading) return <BeatLoader/>
  if (!chat) return <Text>There is no data here...</Text>
  if (error) throw error

  return (
    <Flex direction='column' h='100vh'>
      <Box flex='0 0 auto'>
        <PageNavTab title='Chat Session'/>
      </Box>
      <Box 
        flex='1 1 auto' 
        overflowY='auto'
        minH={0} // prevents forced scrollbars in flex layouts
      >
        {product && <ChatSessionCardSimple chat={chat}/>}
        <ChatMessagesList messages={messages} host={chat.host}/>
      </Box>
      <Box
        position='sticky'
        bottom='0'
        width='100%'
        bg='#262626'
        zIndex={10} // higher than PageNavTab
        boxShadow='0 -2px rgba(0,0,0,0.12)'
      >
        <ChatInputForm
          chatSession={chat!}
          setMessages={setMessages}
          disabledClear={messages.length === 0}
        />
      </Box>
    </Flex>
  )
}

export default ChatDetailPage