import { SubtitleProduct } from '@/entities/Product'
import { Box, HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { renderHighlights } from '@/helps/renderHighlights'
import PostContainer from './PostContainer'
import ShowMore from '@/helps/ShowMore'

interface Props {
  product: SubtitleProduct,
  onUnmark?: () => void,
}
const SubtitleCard = ({ product }: Props) => {
  const content = product.content.content
  const phrases = product.content.expressions.map(exp => exp.title)
  const expressions = product.content.expressions

  return (
    <PostContainer product={product}>
      <Box py={1}>
        <ShowMore startingHeight={200}>
          <Link to={`/products/${product.id}`}>
            {renderHighlights(content, phrases)}
          </Link>
        </ShowMore>
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