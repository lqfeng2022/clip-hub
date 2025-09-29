import ChatMessage from '@/entities/ChatMessage'
import { HStack, Avatar, Box, Text } from '@chakra-ui/react'

interface Props {
  fullName: string | undefined,
  message: ChatMessage
}
const ChatUserMessage = ({ fullName, message }: Props) => {
  return (
    <HStack>
      <Avatar 
        fontWeight='bold' 
        size='sm' 
        alignSelf='flex-start'
        mt={1} 
        name={fullName}
      />
      <Box maxW='350px'>
        <Text pb={1} fontSize='sm' color='gray.300'>
          {fullName}
        </Text>
        <Box borderRadius='10px' background='gray.200' p='5px 10px'>
          <Text color='gray.600' fontWeight='bold'>
            {message.content}
          </Text>
        </Box>
      </Box>
    </HStack>
  )
}

export default ChatUserMessage