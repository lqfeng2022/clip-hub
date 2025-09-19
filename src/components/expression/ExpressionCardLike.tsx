import Expression from '@/entities/Expression'
import useExpressionLikeManager from '@/hooks/interact/useExpressionLikeManager'
import { Icon } from '@chakra-ui/react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'

interface Props {
  expression: Expression,
  onUnmark?: () => void, // optional callback
}
const ExpressionCardLike = ({ expression, onUnmark }: Props) => {
  const { marked, toggleMarked, user } = useExpressionLikeManager(
    expression.id, expression.like_state, onUnmark
  )

  if (!user) return null
  return (
    <Icon
      as={marked ? IoHeart : IoHeartOutline} // or IoBookmark
      boxSize={7}
      color={marked ? 'orange' : ''}
      position='absolute'
      top={1}
      right={1}
      bg='rgba(0,0,0,0.5)'
      borderRadius='full'
      p={1}
      cursor='pointer'
      _hover={{ color: 'pink.300' }}
      onClick={toggleMarked}
    />
  )
}

export default ExpressionCardLike