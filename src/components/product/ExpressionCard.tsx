import noImage from '@/assets/no-image.jpg'
import { ExpressionProduct } from '@/entities/Product'
import { Box, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import PostContainer from './PostContainer'

interface Props {
  product: ExpressionProduct,
  onUnmark?: () => void,
}
const ExpressionCard = ({ product }: Props) => {
  return (
    <PostContainer product={product}>
      <Link to={`/products/${product.id}`}>
        <Text 
          fontSize='md' 
          py={1} 
          _hover={{color: 'yellow.200'}}
        >
          {product.content.title}
        </Text>
      </Link>
      <Box overflow='hidden'>
        <Image
          border='1px'
          borderColor='gray.700'
          borderRadius='xl'
          maxH='420px'
          objectFit='cover'
          src={product.content.image || noImage}
        />
      </Box>
    </PostContainer>
  )
}

export default ExpressionCard