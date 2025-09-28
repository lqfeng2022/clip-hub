import { useAuth } from '@/AuthContext'
import Expression from '@/entities/Expression'
import useChatSession from '@/hooks/store/useChatSession'
import { Badge, Box, Button, Collapse, Heading, InputGroup, InputRightElement, List, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import ChatBotMessage from './ChatBotMessage'
import ChatUserMessage from './ChatUserMessage'

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

  const { data } = useChatSession(expression.id.toString())

  return (
    <Box p={3} margin='12px 18px 24px' borderRadius='10px' background='gray.700'>
      <Collapse in={extend} startingHeight='78px'>
        <Heading size='md' color='gray.500'>Chat Box</Heading>
        <Text p={2} color='gray.200' fontWeight='bold'>
          Hello, this is a chat box, you can ask any question about this 
          English expression...
        </Text>
        {/* chat session and its messages */}
        <List py={3} spacing={6}>
          {data?.results[0]?.messages.map((m) => (
           m.role === 'user' 
             ? <ChatUserMessage fullName={fullName} message={m}/>
             : <ChatBotMessage message={m}/>
          ))}
        </List>
        {/* user input form */}
        <InputGroup pt={10} pb={5}>
          {/* <Input/> */}
          <Textarea
            value={message}
            onChange={handleChange}
            resize='none'
            overflow='hidden'
            minH='40px'
            placeholder='Type a message...'
          />
          <InputRightElement>
            <Badge variant='outline' mr={6} mt={20}>enter</Badge>
          </InputRightElement>
        </InputGroup>
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