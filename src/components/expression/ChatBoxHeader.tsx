import { Box, Heading, Text } from '@chakra-ui/react'

const ChatBoxHeader = () => {
  return (
    <Box mb={5}>
      <Heading size='md' color='gray.500'>Chat Box</Heading>
      <Text p={2} color='gray.200' fontWeight='bold'>
        Hello, this is Bob, an English tutor. Let's talk about this expression here, shall we?
      </Text>
    </Box>
  )
}

export default ChatBoxHeader