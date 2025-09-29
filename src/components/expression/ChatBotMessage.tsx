import ChatMessage from '@/entities/ChatMessage'
import { HStack, Box, Avatar, Text } from '@chakra-ui/react'
import bob from '@/assets/bob.jpeg'

const ChatBotMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <HStack justify='flex-end'>
      <Box maxW='350px'>
        <Text pb={1} fontSize='sm' color='gray.300' textAlign='right'>
          Bob
        </Text>
        <Box borderRadius='10px' background='gray.200' p='5px 12px'>
          <Text color='gray.500' fontWeight='bold'>
            {message.content}
          </Text>
        </Box>
      </Box>
      <Avatar 
        size='sm' 
        alignSelf='flex-start' 
        mt={1} 
        src={bob} 
        backgroundColor='gray.100'
      />
    </HStack>
  )
}

export default ChatBotMessage