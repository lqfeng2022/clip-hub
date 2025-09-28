import ChatMessage from '@/entities/ChatMessage'
import { HStack, Box, Avatar, Text } from '@chakra-ui/react'
import deepseek from '@/assets/deepseek.png'

const ChatBotMessage = ({ message }: { message: ChatMessage }) => {
  return (
    <HStack justify='flex-end'>
      <Box maxW='350px'>
        <Text pb={1} fontSize='sm' color='gray.300' textAlign='right'>
          @deepseek-chat
        </Text>
        <Box borderRadius='10px' background='gray.200' p='4px 8px'>
          <Text color='green.700'>
            {message.content}
          </Text>
        </Box>
      </Box>
      <Avatar 
        size='sm' 
        alignSelf='flex-start' 
        mt={1} 
        src={deepseek} 
        backgroundColor='gray.100'
      />
    </HStack>
  )
}

export default ChatBotMessage