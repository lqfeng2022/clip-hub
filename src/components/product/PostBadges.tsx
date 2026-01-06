import { Product } from '@/entities/Product'
import { Badge } from '@chakra-ui/react'

const TYPE_COLORS: Record<Product['type'], string> = {
  video: 'purple',
  subtitle: 'green',
  expression: 'orange',
}

const PostBadges = ({ product }: { product: Product }) => {
  return (
    <Badge
      colorScheme={TYPE_COLORS[product.type]}
      fontSize='0.8em'
      // fontWeight='light'
      textTransform='capitalize'
    >
      {product.type}
    </Badge>
  )
}

export default PostBadges