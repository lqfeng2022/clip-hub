import { Product } from '@/entities/Product'
import useLikeManager from '@/hooks/useLikeManager'
import { Icon } from '@chakra-ui/react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'

interface Props {
  product: Product,
  onUnmark?: () => void, // optional callback
}
const InteractLikeIcon = ({ product, onUnmark }: Props) => {
  const { marked, toggleMarked, user } = useLikeManager(
    product.id, product.like_state, onUnmark
  )

  return (
    <>
      {user && <Icon
        as={marked ? IoHeart : IoHeartOutline}
        boxSize='20px'
        color={marked ? 'yellow.200' : ''}
        cursor='pointer'
        _hover={{ 
          cursor: 'pointer', 
          color: 'yellow.200', 
          transform: 'scale(1.3)' 
        }}
        transition='transform .25s ease, color .25s ease'
        onClick={toggleMarked}
      />}
      {!user && <Icon 
        as={IoHeartOutline} 
        boxSize='20px' 
        opacity={0.5}
      />}
    </>
  )
}

export default InteractLikeIcon