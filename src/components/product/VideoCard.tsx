import { VideoProduct } from '@/entities/Product'
import { AspectRatio, Box, Text, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import PostContainer from './PostContainer'

interface Props {
  product: VideoProduct,
  onUnmark?: () => void,
}
const VideoCard = ({ product }: Props) => {
  const isShort = product.content.kind === 'SHORT'

  return (
    <PostContainer product={product}>
      <Link to={`/products/${product.id}`}>
        <Text 
          fontSize='sm'
          fontWeight='semibold'
          py={1}
          color='gray.100'
        >
          {product.content.title}
        </Text>
      </Link>
      <Box 
        overflow='hidden'
        borderRadius='lg'
        width={isShort ? '50%' : '100%'}
      >
        <AspectRatio ratio={isShort ? 9/16 : 16/9}>
          <Image src={product.content.cover} />
        </AspectRatio>
      </Box>
    </PostContainer>
  )
}

export default VideoCard