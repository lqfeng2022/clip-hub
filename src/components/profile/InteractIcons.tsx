import { HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { BiShare } from 'react-icons/bi'
import { IoBookmarkOutline, IoEyeOutline } from 'react-icons/io5'
import InteractListIcon from './InteractListIcon'
import InteractLikeIcon from './InteractLikeIcon'
import { useAuth } from '@/AuthContext'
import { Product } from '@/entities/Product'
import InteractChatIcon from './InteractChatIcon'

const InteractIcons = ({ product }: { product: Product}) => {
  const { isAuthenticated } = useAuth()

  return (
    <Stack spacing={4} m='12px 10px 0px'>
      <HStack justifyContent='space-between'>
        {/* AGENT CHAT */}
        <InteractChatIcon product={product}/>
        {/* POST LIKE */}
        <HStack>
          <InteractLikeIcon product={product}/>
          <Text fontSize='sm' fontWeight='semibold'>
            {product.likes_count}
          </Text>
        </HStack>
        {/* POST VIEWS */}
        <HStack>
          <Icon as={IoEyeOutline} boxSize='20px'/>
          <Text fontSize='sm' fontWeight='semibold'>
            {product.views_count}
          </Text>
        </HStack>
        {/* POST LIST */}
        {isAuthenticated ?
          <InteractListIcon product={product}/> :
          <Icon 
            as={IoBookmarkOutline} 
            boxSize='20px' 
            opacity={0.5}
          />
        }
        {/* POST SHARE */}
        <Icon as={BiShare} boxSize={6} color='gray'/>
      </HStack>
    </Stack>
  )
}

export default InteractIcons