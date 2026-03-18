import { Avatar, Box, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import SessionMenuNull from './SessionMenuNull'
import ChatSession from '@/entities/ChatSession'
import { formatDuration } from '@/helps/formatDate'
import { AiOutlineMessage } from 'react-icons/ai'
import { CiCreditCard2 } from 'react-icons/ci'
import { IoIosTime } from 'react-icons/io'
import { formatMessage } from '@/helps/formatMessage'

const ChatSessionCardTwo = ({ chat } : { chat: ChatSession }) => {
  const content = () => {
    const latest_message = chat.latest_chat
    return formatMessage(latest_message) ?? "There's no messages"
  } 

  return (
    <HStack 
      align='flex-start' 
      spacing={4} 
      m={3} 
      p={2} 
      bg='#1A202CAA'
      borderRadius='15px'
    >
      {/* host avatar */}
      <Avatar 
        size={{base: 'md', sm: 'lg'}} 
        src={chat.host.portrait} 
        name={chat.host.name} 
      />
      {/* chat session details */}
      <Box flex='1' bg='transparent' mt={-1}>
        {/* host name/slug and menu */}
        <HStack justifyContent='space-between'>
          <HStack>
            <Text fontWeight='semibold' color='gray.200'>
              {chat.host.name}
            </Text>
            <Text color='gray' fontSize='sm'>
              @{chat.host.slug}
            </Text>
          </HStack>
          <SessionMenuNull chat={chat}/>
        </HStack>
        {/* session details */}
        <Stack spacing={1}>
          {/* latest message */}
          <Link to={`/chat/${chat.id.toString()}`}>
            <Text 
              fontSize='sm' 
              color='gray.100' 
              noOfLines={2}
              _hover={{ color: 'yellow.200' }}
            >
              {content()}
            </Text>
          </Link>
          {/* session metadata */}
          <HStack>
            <Text fontSize='sm' fontWeight='bold'>
              {chat.messages_count ?? 0}
            </Text>
            <Icon as={AiOutlineMessage} boxSize='15px' color='gray' opacity={0.5}/>
            <Text fontSize='sm' fontWeight='light'>
              {formatDuration(chat.total_duration) ?? 0}
            </Text>
            <Icon as={IoIosTime} boxSize='16px' color='gray' opacity={0.5}/>
            <Text fontSize='sm' fontWeight='light'>
              {chat.credits_used.toLocaleString() ?? 0}
            </Text>
            <Icon as={CiCreditCard2} boxSize='18px' color='gold' opacity={0.5}/>
          </HStack>
        </Stack>
      </Box>
    </HStack>
  )
}

export default ChatSessionCardTwo