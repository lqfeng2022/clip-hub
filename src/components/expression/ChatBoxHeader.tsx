import { useAuth } from '@/AuthContext'
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'

interface Props {
  extend: boolean,
  setExtend: () => void
}
const ChatBoxHeader = ({ extend, setExtend }: Props) => {
  const { isAuthenticated } = useAuth()
  const content = isAuthenticated 
    ? `Hello, this is Bob, an English tutor. Let's talk about this expression here, shall we?`
    : `Hello, I'm Bob, a English tutor, If you wanna chat with me, please login or sign up..`
    
  return (
    <Box mb={5} p={isAuthenticated ? 0 : 3}>
      <HStack>
        <Heading size='md' color='gray.500'>Chat Box</Heading>
        {isAuthenticated && !extend && <Button
          size='xl'
          variant='ghost'
          _hover={{ backgrouond: ''}}
          onClick={ setExtend}
        >
          ...more
        </Button>}
      </HStack>
      <Text p={2} color='gray.200' fontWeight='bold'>
        {content}
      </Text>
    </Box>
  )
}

export default ChatBoxHeader