import deepseek from '@/assets/deepseek.png'
import { useAuth } from '@/AuthContext'
import { Avatar, Badge, Box, Button, Collapse, Heading, HStack, InputGroup, InputRightElement, List, ListItem, Text, Textarea } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  extend: boolean,
  setExtend: () => void,
}
const ChatBox = ({ extend, setExtend }: Props) => {
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

  return (
    <Box p={3} mt={3} mb={6} borderRadius='10px' background='gray.700'>
      <Collapse in={extend} startingHeight='80px'>
        <Heading size='md' color='gray.500'>Chat Box</Heading>
        <Text p={2} color='gray.200' fontWeight='bold'>
          Hello, this is a chat box, you can ask any question about this 
          English expression...
        </Text>
        <List py={3} spacing={6}>
          <ListItem>
            {/* user chat */}
            <HStack>
              <Avatar fontWeight='bold' size='sm' alignSelf='flex-start' mt={1} name={fullName}/>
              <Box maxW='350px'>
                <Text pb={1} fontSize='sm' color='gray.300'>@{fullName}</Text>
                <Box borderRadius='10px' background='gray.200' p='4px 8px'>
                  <Text color='gray.700'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </Text>
                </Box>
              </Box>
            </HStack>
          </ListItem>
          <ListItem>
            {/* English teacher chat */}
            <HStack justify='flex-end'>
              <Box maxW='350px'>
                <Text pb={1} fontSize='sm' color='gray.300' textAlign='right'>@deepseek-chat</Text>
                <Box borderRadius='10px' background='gray.200' p='4px 8px'>
                  <Text color='green.700'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </Text>
                </Box>
              </Box>
              <Avatar size='sm' alignSelf='flex-start' mt={1} src={deepseek} backgroundColor='gray.100'/>
            </HStack>
          </ListItem>
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