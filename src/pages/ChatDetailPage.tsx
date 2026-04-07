import BeatLoader from '@/components/BeatLoader'
import ChatInputForm from '@/components/chat/ChatInputForm'
import ChatMessagesList from '@/components/chat/ChatMessagesList'
import ChatSessionCardSimple from '@/components/chat/ChatSessionCardSimple'
import PageNavTab from '@/components/PageNavTab'
import ChatMessage from '@/entities/ChatMessage'
import useChatSession from '@/hooks/interact-chat/useChatSession'
import useChatSessionMessages from '@/hooks/interact-chat/useChatSessionMessages'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const ChatDetailPage = () => {
  const { id } = useParams() // get `id` from url
  const { data: chat, error, isLoading } = useChatSession(id!)
  const product = chat?.product

  // use paginated messages (30 per page) to avoid loading thousands at once
  const {
    data: messagesPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingMessages,
  } = useChatSessionMessages(id!, { enabled: Boolean(id) })

  const chatMessages = messagesPages?.pages.flatMap(p => p.results) ?? []

  // ensure chronological order: oldest -> newest
  const sortedChatMessages = chatMessages
    .slice()
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  // set a local empty STATE `messages`, then put the chatMessages to it once
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // 🔹 This is the REAL scroll container
  const scrollRef = useRef<HTMLDivElement>(null)

  // 🔹 Track if we've done the initial jump-to-bottom
  const didInitialScroll = useRef(false)

  // store previous scroll height when loading older pages so we can restore position
  const prevHeightRef = useRef<number | null>(null)

  // Initialize / merge messages from pages
  useEffect(() => {
    if (sortedChatMessages.length === 0) return

    // initial load
    if (messages.length === 0) {
      setMessages(sortedChatMessages)
      return
    }

    // when more pages are loaded, replace local messages with sorted list
    if (sortedChatMessages.length > messages.length) {
      setMessages(sortedChatMessages)
    }
  }, [messagesPages])

  /** INITIAL LOAD SCROLL
   * useLayoutEffect runs BEFORE browser paint.
   * This prevents visible scrolling animation.
   * Result: When user opens chat → it starts at bottom instantly.
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


  /** NEW MESSAGE SCROLL
   * After initial load, if a new message arrives, scroll smoothly to bottom.
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

  // Load older messages when user scrolls to top
  const handleScroll = async () => {
    if (!scrollRef.current) return
    if (scrollRef.current.scrollTop > 50) return
    if (!hasNextPage || isFetchingNextPage) return

    prevHeightRef.current = scrollRef.current.scrollHeight
    await fetchNextPage()
  }

  // After messages state updates (e.g., older pages loaded), restore scroll position
  useEffect(() => {
    if (prevHeightRef.current == null) return
    if (!scrollRef.current) return

    const newHeight = scrollRef.current.scrollHeight
    scrollRef.current.scrollTop = newHeight - prevHeightRef.current
    prevHeightRef.current = null
  }, [messages.length])

  if (isLoading) return <BeatLoader/>
  if (!chat) return <Text>There is no data here...</Text>
  if (error) throw error

  return (
    <Flex direction='column' h='100vh'>
      <Box flex='0 0 auto'>
        <PageNavTab title='Chat Session'/>
      </Box>
      {/* THIS is the scrollable container */}
      <Box 
        ref={scrollRef}
        onScroll={handleScroll}
        flex='1 1 auto' 
        overflowY='auto'
        minH={0} // prevents forced scrollbars in flex layouts
        pb='80px' // match ChatInput height
      >
        {product && <ChatSessionCardSimple chat={chat}/>}
        {/* optional loader when fetching older messages */}
        {isFetchingNextPage && <BeatLoader />}
        <ChatMessagesList 
          chatSessionId={Number(id)} 
          messages={messages} 
          host={chat.host}
        />
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