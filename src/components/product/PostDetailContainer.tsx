import { Product } from '@/entities/Product'
import { formatDate } from '@/helps/formatDate'
import useInteractPost from '@/hooks/store/useInteractPost'
import useViews from '@/hooks/store/useViews'
import useFollowManager from '@/hooks/useFollowManager'
import { Box, Divider, HStack, Stack, Text } from '@chakra-ui/react'
import { ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HostAvatar from '../host/HostAvatar'
import SubscribeButton from '../host/SubscribeButton'
import InteractIcons from '../profile/InteractIcons'
import HostBadge from './HostBadge'
import { useAuth } from '@/AuthContext'

interface Props {
  product: Product,
  children?: ReactNode,
}
const PostDetailContainer = ({ product, children }: Props) => {
  const { user } = useAuth()
  const { marked, toggleMarked } = useFollowManager(product.host.id, product.followed)

  const frommatedDate = formatDate(product.updated_at)

  const { mutate } = useInteractPost(product.id, 'view')
  const { refetch } = useViews()
  
  // post view obj when user is authenticated, then refetch the views
  useEffect(() => { 
    if (!user) return
    mutate(
      { visible: true }, 
      { onSuccess: () => refetch() }
    )
  }, []) // run only on mount

  return (
    <Box px={4} pt={3}>
      {/* HOST info */}
      <HStack justifyContent='space-between' align='flex-start'>
        <HStack spacing={2.5}>
          <Link to={`/host/${product.host.slug}`}>
            <HostAvatar host={product.host}/>
          </Link>
          <Stack gap={1}>
            <HStack>
              <Text fontWeight='bold' lineHeight={1}>
                {product.host.name}
              </Text>
              <HostBadge/>
            </HStack>
            <Text color='gray' fontSize='sm'>
              @{product.host.slug}
            </Text>
          </Stack>
        </HStack>
        <SubscribeButton 
          followed={marked} 
          onToggle={toggleMarked}
        />
      </HStack>
      {/* CONTENT: expression/subtitle/video */}
        {children}
      {/* POST updated date & views */}
      <Box height='50px' alignContent='center'>
        <Text color='gray'>{frommatedDate}</Text>
      </Box>
      <Divider/>
      {/* POST interact icons */}
      <Box pb={2}>
        <InteractIcons product={product}/>
      </Box>
    </Box>
  )
}

export default PostDetailContainer