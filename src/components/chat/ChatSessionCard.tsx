import noImage from '@/assets/no-image.jpg'
import getProductDisplay from '@/helps/getProductDisplay'
import { Avatar, Box, HStack, Icon, Image, Stack, Text } from '@chakra-ui/react'
import PostBadges from '../product/PostBadges'
import { Link } from 'react-router-dom'
import SessionMenu from './SessionMenu'
import ChatSession from '@/entities/ChatSession'
import { formatDuration } from '@/helps/formatDate'
import { AiOutlineMessage } from 'react-icons/ai'
import { CiCreditCard2 } from 'react-icons/ci'
import { IoIosTime } from 'react-icons/io'

const ChatSessionCard = ({ chat } : { chat: ChatSession }) => {
  const product = chat.product
  const { image, title } = getProductDisplay(product)

  return (
    <HStack 
      align='flex-start' 
      spacing={4} 
      m={3} 
      p={2}
      bg='#1A202CAA'
      borderRadius='15px'
    >
      {/* HOST avatar */}
      <Avatar 
        size={{base: 'md', sm: 'lg'}}
        name={chat.host.name} 
        src={chat.host.portrait}
      />
      {/* CHAT SESSION details */}
      <Box flex='1' bg='transparent' mt={-1}>
        {/* Host name/slug + menu */}
        <HStack justifyContent='space-between'>
          <HStack>
            <Text fontWeight='semibold' color='gray.200'>
              {chat.host.name}
            </Text>
            <Text color='gray' fontSize='sm'>
              @{chat.host.slug}
            </Text>
            <PostBadges product={product}/>
          </HStack>
          <SessionMenu chat={chat}/>
        </HStack>
        {/* Session details */}
        <HStack align='flex-start' pt={1}>
          {/* session related image */}
          <Link to={`/chat/${chat.id}`}>
            <Box
              borderRadius='md'
              overflow='hidden'
              w={{base: '130px', sm: '180px'}}
              maxH='50px'
              flexShrink={0}
            >
              <Image src={image ?? noImage}/>
            </Box>
          </Link>
          {/* session related title + metadata */}
          <Stack spacing={0}>
            {/* session related title */}
            <Link to={`/chat/${chat.id}`}>
              <Text 
                fontSize='sm' 
                color='gray.100' 
                noOfLines={2} 
                _hover={{ color: 'yellow.200' }}
              >
                {title!}
              </Text>
            </Link>
          </Stack>
        </HStack>
        {/* session metadata */}
        <HStack pt={2}>
          <Icon as={AiOutlineMessage} boxSize='15px' color='gray' opacity={0.5}/>
          <Text fontSize='sm' fontWeight='bold'>
            {chat.messages_count ?? 0}
          </Text>
          <Icon as={IoIosTime} boxSize='16px' color='gray' opacity={0.5}/>
          <Text fontSize='sm' fontWeight='light'>
            {formatDuration(chat.total_duration) ?? 0}
          </Text>
          <Icon as={CiCreditCard2} boxSize='18px' color='gray' opacity={0.5}/>
          <Text fontSize='sm' fontWeight='light'>
            {chat.credits_used.toLocaleString() ?? 0}
          </Text>
        </HStack>
      </Box>
    </HStack>
  )
}

export default ChatSessionCard