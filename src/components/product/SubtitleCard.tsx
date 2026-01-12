import { SubtitleProduct } from '@/entities/Product'
import { Box, HStack, Image } from '@chakra-ui/react'
import { renderHighlights } from '@/helps/renderHighlights'
import PostContainer from './PostContainer'

interface Props {
  product: SubtitleProduct,
  onUnmark?: () => void,
}
const SubtitleCard = ({ product }: Props) => {
  const content = product.content.content
  const phrases = product.content.expressions.map(exp => exp.title)
  const productId = product.id.toString()
  const expressions = product.content.expressions

  return (
    <PostContainer product={product}>
      <Box py={1}>
        {renderHighlights(content, phrases, productId)}
      </Box>
      <HStack 
        overflowX='auto' 
        whiteSpace='nowrap'
        sx={{'&::-webkit-scrollbar': { display: 'none' }}}
      >
        {expressions.map((exp, idx) => 
          <Image
            key={idx}
            height='300px'
            objectFit='cover'
            border='1px'
            borderColor='gray.700'
            src={exp.image}
          />
        )}
      </HStack>
    </PostContainer>
  )
}

export default SubtitleCard