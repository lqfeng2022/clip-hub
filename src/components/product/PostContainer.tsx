import { Product } from '@/entities/Product'
import { Box, Card, HStack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import HostAvatar from '../host/HostAvatar'
import InteractIcons from '../profile/InteractIcons'
import PostMenu from './PostMenu'
import { formatSimpleDate } from '@/helps/formatDate'
import PostBadges from './PostBadges'

interface Props {
  product: Product,
  children?: ReactNode,
}
const PostContainer = ({ product, children }: Props) => {
  const frommatedDate = formatSimpleDate(product.updated_at)
  
  return (
    <Box 
      p={2} 
      borderBottom='1px solid' 
      borderColor='gray.700' 
      _hover={{ bg: 'gray.700'}}
    >
      <HStack align='flex-start' spacing={2}>
        <Box pt={1}>
          <Link to={`/host/${product.host.slug}`}>
            <HostAvatar host={product.host} size='md'/>
          </Link>
        </Box>
        <Card boxShadow='none' flex='1' bg='transparent'>
          {/* TOP: host info + menu */}
          <HStack justifyContent='space-between'>
            <HStack>
              <Text fontWeight='bold' fontSize='sm'>
                {product.host.name}
              </Text>
              <Text color='gray' fontSize='sm'>
                @{product.host.slug}
              </Text>
              <PostBadges product={product}/>
              <Text color='gray.300' fontSize='sm'>
                {frommatedDate}
              </Text>
            </HStack>
            <Box my='-8px'>
              <PostMenu product={product}/>
            </Box>
          </HStack>
            {/* CENTER: expression, subtitle, video */}
            {children}
          {/* BOTTOM: */}
          <InteractIcons product={product}/>
        </Card>
      </HStack>
    </Box>
  )
}

export default PostContainer