import { Box, Heading, Text } from '@chakra-ui/react'

const ChatBoxUnauth = () => {
  return (
    <Box p={3} margin='12px 2px 24px' borderRadius='10px' background='gray.700'>
      <Heading size='md' color='gray.500'>Chat Box</Heading>
      <Text p={2} color='gray.200' fontWeight='bold'>
        Hello, I'm Bob, a English tutor, If you wanna chat with me, please login or sign up..
      </Text>
    </Box>
  )
}

export default ChatBoxUnauth