import { SubtitleProduct } from '@/entities/Product'
import { Box, HStack, Image } from '@chakra-ui/react'
import PostDetailContainer from './PostDetailContainer'
import { renderHighlights } from '@/helps/renderHighlights'

interface Props {
  product: SubtitleProduct,
  onUnmark?: () => void,
}
const SubtitleDetailCard = ({ product }: Props) => {
  const content = product.content.content
  const phrases = product.content.expressions.map(exp => exp.title)
  const expressions = product.content.expressions

  return (
    <PostDetailContainer product={product}>
      <Box py={2}>
        {renderHighlights(content, phrases, { maxLength: 2000 })}
      </Box>
      <HStack 
        overflowX='auto' 
        whiteSpace='nowrap'
        borderRadius='10px'
        sx={{'&::-webkit-scrollbar': { display: 'none' }}}
      >
        {expressions.map((exp, idx) => 
          <Image
            key={idx}
            height='400px'
            objectFit='cover'
            border='1px'
            borderColor='gray.600'
            src={exp.image}
          />
        )}
      </HStack>
    </PostDetailContainer>
  )
}

export default SubtitleDetailCard