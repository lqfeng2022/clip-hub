import { useAuth } from '@/AuthContext'
import { Box, Heading, Text } from '@chakra-ui/react'

const ChatBoxHeader = () => {
  const { isAuthenticated } = useAuth()
  const content = isAuthenticated 
    ? `Hello, this is Bob, an English tutor. Let's talk about this expression here, shall we?`
    : `Hello, I'm Bob, a English tutor, If you wanna chat with me, please login or sign up..`
    
  return (
    <Box mb={5} p={isAuthenticated ? 0 : 3}>
      <Heading size='md' color='gray.500'>Chat Box</Heading>
      <Text p={2} color='gray.200' fontWeight='bold'>
        {content}
      </Text>
    </Box>
  )
}

export default ChatBoxHeader