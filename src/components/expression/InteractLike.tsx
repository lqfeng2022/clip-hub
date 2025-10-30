import Expression from '@/entities/Expression'
import useExpressionLikeManager from '@/hooks/interact/useExpressionLikeManager'
import { Icon } from '@chakra-ui/react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'

interface Props {
  expression: Expression,
  onUnmark?: () => void, // optional callback
}
const InteractLike = ({ expression, onUnmark }: Props) => {
  const { marked, toggleMarked, user } = useExpressionLikeManager(
    expression.id, expression.like_state, onUnmark)

  return (
    <>
      { user ? (
        <Icon
          as={marked ? IoHeart : IoHeartOutline} // or IoBookmark
          boxSize={6}
          color={marked ? 'orange' : ''}
          cursor='pointer'
          _hover={{ color: 'orange.300' }}
          onClick={toggleMarked}
        /> ) : (
          <Icon as={IoHeartOutline} boxSize={6} opacity={0.5}/>
        )
      }
    </>
  )
}

export default InteractLike