import noImage from '@/assets/no-image.jpg'
import getProductDisplay from '@/helps/getProductDisplay'
import { Avatar, Box, HStack, Icon, Image, Stack, Text } from '@chakra-ui/react'
import PostBadges from '../product/PostBadges'
import { Link } from 'react-router-dom'
import SessionMenu from './SessionMenu'
import ChatSession from '@/entities/ChatSession'
import { formatMessage } from '@/helps/formatMessage'
import { formatDuration } from '@/helps/formatDate'
import { AiOutlineMessage } from 'react-icons/ai'
import { CiCreditCard2 } from 'react-icons/ci'
import { IoIosTime } from 'react-icons/io'

const ChatSessionCard = ({ chat } : { chat: ChatSession }) => {
  const product = chat.product
  const host = chat.host
  const {image, title } = getProductDisplay(product, 40)

  return (
    <HStack 
      align='flex-start' 
      spacing={4} 
      m={3} 
      p={2}
      bg='#1A202CAA'
      borderRadius='15px'
    >
      <Avatar 
        size={{base: 'md', sm: 'lg'}}
        name={host.name} 
        src={host.portrait}
        />
      <Box flex='1' bg='transparent'>
        <HStack justifyContent='space-between'>
          <HStack>
            <Text fontWeight='semibold' color='gray.200'>
              {host.name}
            </Text>
            <Text color='gray' fontSize='sm'>
              @{host.slug}
            </Text>
            <PostBadges product={product}/>
          </HStack>
          <SessionMenu chat={chat}/>
        </HStack>
        <Link to={`/chat/${chat.id}`}>
          <HStack align='flex-start' pt={1}>
            <Box
              borderRadius='lg'
              overflow='hidden'
              w={{base: '130px', sm: '180px'}}
              maxH='80px'
              flexShrink={0}
            >
              <Image src={image ?? noImage}/>
            </Box>
            {/* Chat Session metadata */}
            <Stack spacing={1}>
              <Text fontSize='xs' color='gray.100'>
                {formatMessage(title!)}
              </Text>
              <HStack>
                <Text fontSize='xl' fontWeight='bold'>
                  {chat.messages_count ?? 0}
                </Text>
                <Icon as={AiOutlineMessage} boxSize='15px' color='gold' opacity={0.5}/>
                <Text fontSize='sm'>
                  {formatDuration(chat.total_duration) ?? 0}
                </Text>
                <Icon as={IoIosTime} boxSize='16px' color='gold' opacity={0.5}/>
                <Text fontSize='sm'>
                  {chat.credits_used.toLocaleString() ?? 0}
                </Text>
                <Icon as={CiCreditCard2} boxSize='18px' color='gold' opacity={0.5}/>
              </HStack>
            </Stack>
          </HStack>
        </Link>
      </Box>
    </HStack>
  )
}

export default ChatSessionCard