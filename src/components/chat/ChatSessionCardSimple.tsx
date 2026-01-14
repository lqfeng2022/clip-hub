import noImage from '@/assets/no-image.jpg'
import getProductDisplay from '@/helps/getProductDisplay'
import { Avatar, Box, HStack, Image, Text } from '@chakra-ui/react'
import PostBadges from '../product/PostBadges'
import { Link } from 'react-router-dom'
import ChatSession from '@/entities/ChatSession'

interface Props {
  chat: ChatSession,
}
const ChatSessionCardSimple = ({ chat } : Props) => {
  const product = chat.product
  const host = chat.host
  const { image, title } = getProductDisplay(product, 35)

  return (
    <HStack 
      align='flex-start' 
      spacing={5} 
      m={4} 
      p={3}
      bg='RGBA(0, 0, 0, 0.22)'
      borderRadius='15px'
    >
      <Link to={`/host/${host.slug}`}>
        <Avatar 
          size={{base: 'md', sm: 'lg'}}
          name={host.name} 
          src={host.portrait}
          className='img-hover'
        />
      </Link>
      <Box flex='1' bg='transparent'>
        <HStack>
          <Text fontWeight='semibold' color='gray.200'>
            {host.name}
          </Text>
          <Text color='gray' fontSize='sm'>
            @{host.slug}
          </Text>
          <PostBadges product={product}/>
        </HStack>
        <HStack align='flex-start' pt={2}>
          <Link to={`/products/${product.id}`}>
            <Box
              borderRadius='lg'
              overflow='hidden'
              w={{base: '130px', sm: '180px'}}
              maxH={{base: '60px', sm: '80px'}}
              flexShrink={0}
            >
              <Image 
                src={image ?? noImage}
                className='img-hover'
              />
            </Box>
          </Link>
          <Text 
            fontSize={{base: 'xs', sm: 'sm'}}
            fontWeight='bold' 
            color='gray.100'
          >
            {title}
          </Text>
        </HStack>
      </Box>
    </HStack>
  )
}

export default ChatSessionCardSimple