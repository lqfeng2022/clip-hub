import { VideoProduct } from '@/entities/Product'
import { AspectRatio, Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import PostContainer from './PostContainer'

interface Props {
  product: VideoProduct,
  onUnmark?: () => void,
}
const VideoCard = ({ product }: Props) => {
  const isShort = product.content.kind === 'SHORT'
  const ratio = isShort ? 9/16 : 16/9
  const width = isShort ? '50%' : '100%'

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
        width={width}
      >
        <AspectRatio ratio={ratio}>
          <video 
            src={product.content.file} 
            poster={product.content.cover} 
            controls
          />
        </AspectRatio>
      </Box>
    </PostContainer>
  )
}

export default VideoCard