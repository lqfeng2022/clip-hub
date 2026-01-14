import { useAuth } from '@/AuthContext'
import { Avatar, AvatarGroup, HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import SessionMenuNull from './SessionMenuNull'
import ChatSession from '@/entities/ChatSession'
import { truncateAtWord } from '@/helps/textWorker'

const ChatSessionCardTwo = ({ chat } : { chat: ChatSession }) => {
  const { user } = useAuth()

  const portrait = `${user?.portrait}`
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username

  const content = () => {
    const latest_message = chat.latest_chat
    if (latest_message) return `- ${truncateAtWord(latest_message, 50)}`
    return "There's no messages"
  } 

  return (
    <HStack 
      align='flex-start' 
      spacing={4} 
      m={3} p={2} 
      bg='#1A202CAA'
      borderRadius='15px'
    >
      <AvatarGroup size={{base: 'md', sm: 'lg'}} max={2}>
        <Avatar name={fullName} src={portrait} borderColor='gray.200' opacity={0.8}/>
        <Avatar src={chat.host.portrait} />
      </AvatarGroup>
      {/* `flex: '1'`: Make this HStack grow to fill available space */}
      <HStack justifyContent='space-between' flex='1' align='flex-start'>
        <Link to={`/profile/chat/${chat.id.toString()}`}>
          <HStack spacing={2} pt={2}>
            <Stack spacing={1}>
              <Text 
                fontSize={{base: 'xs', sm: 'md'}}
                fontWeight='bold' 
                color='gray.100'
              >
                {content()}
              </Text>
              <HStack>
                <Text fontSize='xl' fontWeight='bold'>
                  {chat.messages_count ?? 0}
                </Text>
                <Text fontSize='xs' color='gray.500'>
                  messages
                </Text>
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