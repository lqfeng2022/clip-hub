import BeatLoader from '@/components/BeatLoader'
import ChatInputForm from '@/components/chat/ChatInputForm'
import ChatMessagesList from '@/components/chat/ChatMessagesList'
import ChatSessionCardSimple from '@/components/chat/ChatSessionCardSimple'
import PageNavTab from '@/components/PageNavTab'
import ChatMessage from '@/entities/ChatMessage'
import useChatSession from '@/hooks/interact/useChatSession'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const ChatDetailPage = () => {
  const { id } = useParams() // get `id` from url
  const { data: chat, error, isLoading } = useChatSession(id!)
  const product = chat?.product
  const chatMessages = chat?.messages

  // set a local empty STATE `messages`, then put the chatMessages to it once
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // 🔹 This is the REAL scroll container
  const scrollRef = useRef<HTMLDivElement>(null)

  // 🔹 Track if we've done the initial jump-to-bottom
  const didInitialScroll = useRef(false)

  // Initialize messages once
  useEffect(() => {
    if (chatMessages && messages.length === 0) 
      setMessages(chatMessages)
  }, [chatMessages])

  /**
   * 🟢 INITIAL LOAD SCROLL
   * 
   * useLayoutEffect runs BEFORE browser paint.
   * This prevents visible scrolling animation.
   * 
   * Result:
   * When user opens chat → it starts at bottom instantly.
   */
  useLayoutEffect(() => {
    if (
      !didInitialScroll.current &&
      scrollRef.current &&
      messages.length > 0
    ) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      didInitialScroll.current = true
    }
  }, [messages.length])


  /**
   * 🟢 NEW MESSAGE SCROLL
   * 
   * After initial load,
   * if a new message arrives,
   * scroll smoothly to bottom.
   */
  useEffect(() => {
    if (!didInitialScroll.current) return

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages.length])

  if (isLoading) return <BeatLoader/>
  if (!chat) return <Text>There is no data here...</Text>
  if (error) throw error

  return (
    <Flex direction='column' h='100vh'>
      <Box flex='0 0 auto'>
        <PageNavTab title='Chat Session'/>
      </Box>
      {/* 🔹 THIS is the scrollable container */}
      <Box 
        ref={scrollRef}
        flex='1 1 auto' 
        overflowY='auto'
        minH={0} // prevents forced scrollbars in flex layouts
        pb='80px' // match ChatInput height
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