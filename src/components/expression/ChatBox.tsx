import { useAuth } from '@/AuthContext'
import Expression from '@/entities/Expression'
import useChatSession from '@/hooks/store/useChatSession'
import { Box, Button, Collapse, Flex, FormControl, FormHelperText, Heading, InputGroup, List, Text, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ChatBotMessage from './ChatBotMessage'
import ChatUserMessage from './ChatUserMessage'
import BeatLoader from '../BeatLoader'
import useChatSessionPost from '@/hooks/interact/useChatSessionPost'
import useChatMessagePost from '@/hooks/interact/useChatMessagePost'
import { ChatForm, chatSchema } from '@/validation/chatSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ChatMessage from '@/entities/ChatMessage'
import useChatSessionDelete from '@/hooks/interact/useChatSessionDelete'

interface Props {
  expression: Expression,
  extend: boolean,
  setExtend: () => void,
}
const ChatBox = ({ expression, extend, setExtend }: Props) => {
  const { user } = useAuth()
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username

  // GET chat session
  const { data: chatSessions, isLoading, error, refetch} = useChatSession(expression.id.toString())
  const chatSession = chatSessions?.results[0]

  // local US STATE
  const [messages, setMessages] = useState<ChatMessage[]>([])
  // initialize once
  useEffect(() => {
    if (chatSession && messages.length === 0) 
      setMessages(chatSession.messages)
  }, [chatSession])

  // POST chat session if there's no one
  const { mutate: postChatSession } = useChatSessionPost(expression.id, 'chatsession')
  const handlePost = () => {
    postChatSession({}, { onSuccess: () => refetch()})
  }

  // POST chat messages
  const chatId = chatSession?.id
  const { mutate: postChatMessage } = useChatMessagePost(chatId!)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ChatForm>({
    resolver: zodResolver(chatSchema)
  })
  
  const onSubmit = (data: ChatForm) => {
    if (!chatId) return  // if no chatSession, do nothing here

    // 1) Optimistically show user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: data.content,
      created_at: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMessage])

    // 2) Send to backend
    if (!chatSession?.id) return // safer guarantee
    postChatMessage({ content: data.content }, {
      onSuccess: (assistantMessage) => {
        // 3) Immediately append assistant reply
        setMessages(prev => [...prev, { ...assistantMessage }])
      },
      onSettled: () => reset() // clear textarea
    })
  }
  // •	messages now drives the UI; the user sees their message instantly, and the assistant reply shows as soon as the POST resolves.
	// •	Because `useChatMessagePost` returns only the assistant message, there’s no doubling of the user message.
	// •	`chatSession.messages` is used only once for initialization; after that, the UI is fully controlled by messages.
  
  // Delete chatSession
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
    <Box p={3} margin='12px 18px 24px' borderRadius='10px' background='gray.700'>
      <Collapse in={extend} startingHeight='78px'>
        <Heading size='md' color='gray.500'>Chat Box</Heading>
        <Text p={2} color='gray.200' fontWeight='bold'>
          Hello, this is a chat box, you can ask any question about this 
          English expression...
        </Text>
        {/* chat session and its messages */}
        {isLoading && <BeatLoader/>}
        {!isLoading && chatSession && <List py={3} spacing={6}>
          {messages.map((m) => (
           m.role === 'user' 
             ? <ChatUserMessage key={m.id} fullName={fullName} message={m}/>
             : <ChatBotMessage key={m.id} message={m}/>
          ))}
        </List>}
        {/* create chatsession if there's no chatsession */}
        {!chatSession && <Button my={3} size='sm' onClick={handlePost}>Start a chat</Button>}
        {/* user input form */}
        {chatSession && <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.content}>
            <InputGroup p='28px 8px 5px'>
              <Textarea
                {...register('content')}
                resize='none'
                overflow='hidden'
                minH='40px'
                placeholder='Type a message...'
              />
            </InputGroup>
            <FormHelperText color='red.300' p='0px 8px 10px'>
              {errors.content?.message}
            </FormHelperText>
          </FormControl>
          <Flex justify='space-between' mx={2} my={5}>
            <Button size='sm' type='submit'>Submit</Button>
            <Button 
              size='sm' 
              onClick={() => handleDeleteChat(chatSession.id)}
              isDisabled={messages.length === 0}
            >
              Clear Chat
            </Button>
          </Flex>
        </form>}
      </Collapse>
      <Flex justify='flex-end' px='3px' _hover={{ backgrouond: ''}}>
        {extend && <Button size='sm' variant='ghost' onClick={setExtend}>
          show lesss
        </Button>}
      </Flex>
    </Box>
  )
}

export default ChatBox