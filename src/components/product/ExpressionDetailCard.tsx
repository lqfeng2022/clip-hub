import noImage from '@/assets/no-image.jpg'
import { ExpressionProduct } from '@/entities/Product'
import { Box, Image, Text } from '@chakra-ui/react'
import PostDetailContainer from './PostDetailContainer'

interface Props {
  product: ExpressionProduct,
}
const ExpressionDetailCard = ({ product }: Props) => {
  return (
    <PostDetailContainer product={product}>
      {/* POST content */}
      <Text fontSize='lg' py={2} color='gray.100'>
        {product.content.title}
      </Text>
      {/* POST video/image.. */}
      <Box 
        overflow='hidden' 
        display='flex' 
        justifyContent='center'
      >
        <Image
          border='1px'
          borderColor='gray.700'
          borderRadius='2xl'
          width='100%'
          objectFit='cover'
          src={product.content.image || noImage}
        />
      </Box>
    </PostDetailContainer>
  )
}

export default ExpressionDetailCard