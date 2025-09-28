import { useAuth } from '@/AuthContext'
import Expression from '@/entities/Expression'
import useChatSession from '@/hooks/store/useChatSession'
import { Badge, Box, Button, Collapse, FormControl, FormHelperText, Heading, InputGroup, InputRightElement, List, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import ChatBotMessage from './ChatBotMessage'
import ChatUserMessage from './ChatUserMessage'
import BeatLoader from '../BeatLoader'
import useChatSessionPost from '@/hooks/interact/useChatSessionPost'
import useChatMessagePost from '@/hooks/interact/useChatMessagePost'
import { ChatForm, chatSchema } from '@/validation/chatSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

  const [message, setMessage] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    // auto-grow:
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  // get chat session
  const { data: chatSessions, isLoading, error, refetch} = useChatSession(expression.id.toString())
  const chatSession = chatSessions?.results[0]

  // create a chat session if there's no one
  const { mutate: postChatSession } = useChatSessionPost(expression.id, 'chatsession')
  const handlePost = () => {
    postChatSession({}, { 
      onSuccess: () => refetch()
    })
  }

  // post chat message
  const chatId = chatSession?.id
  const { mutate: postChatMessage } = useChatMessagePost(chatId!)

  const { register, handleSubmit, formState: { errors } } = useForm<ChatForm>({
    resolver: zodResolver(chatSchema)
  })
  
  const onSubmit = (data: ChatForm) => {
    if (!chatId) return  // if no chatSession, do nothing here
    postChatMessage(data, {
      onSuccess: () => refetch()
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
          {chatSession.messages.map((m) => (
           m.role === 'user' 
             ? <ChatUserMessage key={m.id} fullName={fullName} message={m}/>
             : <ChatBotMessage key={m.id} message={m}/>
          ))}
        </List>}
        {/* create chatsession if there's no chatsession */}
        {!chatSession && <Button my={3} size='sm' onClick={handlePost}>
          Start a chat
        </Button>
        }
        {/* user input form */}
        {chatSession && <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.content}>
            <InputGroup pt={10} pb={5} px={2}>
              {/* <Input/> */}
              <Textarea
                {...register('content')}
                onChange={handleChange}
                resize='none'
                overflow='hidden'
                minH='40px'
                placeholder='Type a message...'
              />
              <InputRightElement>
                <Badge variant='outline' mr={10} mt={20}>enter</Badge>
              </InputRightElement>
            </InputGroup>
            <FormHelperText color='red.300'>{errors.content?.message}</FormHelperText>
          </FormControl>
          <Button m={2} size='sm' fontSize='lg' type="submit">
            Submit
          </Button>
        </form>}
      </Collapse>
      {extend && <Button 
        size='sm' 
        px='3px' 
        variant='ghost' 
        _hover={{ backgrouond: ''}} 
        onClick={setExtend}
      >
        show lesss
      </Button>}
    </Box>
  )
}

export default ChatBox