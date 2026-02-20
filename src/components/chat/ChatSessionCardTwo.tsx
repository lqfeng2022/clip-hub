import { useAuth } from '@/AuthContext'
import { Avatar, AvatarGroup, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import SessionMenuNull from './SessionMenuNull'
import ChatSession from '@/entities/ChatSession'
import { truncateAtWord } from '@/helps/textWorker'
import { formatDuration } from '@/helps/formatDate'
import { AiOutlineMessage } from 'react-icons/ai'
import { CiCreditCard2 } from 'react-icons/ci'
import { IoIosTime } from 'react-icons/io'

const ChatSessionCardTwo = ({ chat } : { chat: ChatSession }) => {
  const { user } = useAuth()

  const portrait = `${user?.portrait}`
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username

  const content = () => {
    const latest_message = chat.latest_chat
    if (latest_message) 
      return `${truncateAtWord(latest_message, 35)}`
    return "There's no messages"
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
      <AvatarGroup size={{base: 'md', sm: 'lg'}} max={2}>
        <Avatar name={fullName} src={portrait} border='0'opacity={0.8}/>
        <Avatar src={chat.host.portrait} />
      </AvatarGroup>
      <HStack 
        align='flex-start' 
        justifyContent='space-between' 
        flex='1' 
        mt='-5px'
      >
        <Link to={`/chat/${chat.id.toString()}`}>
          <HStack spacing={2} pt={2}>
            <Stack spacing={1}>
              <Text fontSize='xs' color='gray.100'>
                {content()}
              </Text>
              <HStack>
                <Text fontSize='xl' fontWeight='bold'>
                  {chat.messages_count ?? 0}
                </Text>
                <Icon as={AiOutlineMessage} boxSize='15px' color='gray' opacity={0.5}/>
                <Text fontSize='sm'>
                  {formatDuration(chat.total_duration) ?? 0}
                </Text>
                <Icon as={IoIosTime} boxSize='16px' color='gray' opacity={0.5}/>
                <Text fontSize='sm'>
                  {chat.credits_used.toLocaleString() ?? 0}
                </Text>
                <Icon as={CiCreditCard2} boxSize='18px' color='gold' opacity={0.5}/>
              </HStack>
            </Stack>
          </HStack>
        </Link>
        <SessionMenuNull chat={chat}/>
      </HStack>
    </HStack>
  )
}

export default ChatSessionCardTwo