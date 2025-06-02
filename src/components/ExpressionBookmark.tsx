import { Icon } from '@chakra-ui/react'
import { useRef } from 'react'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import Expression from '../entities/Expression'

interface Props {
  expression: Expression
}
const ExpressionBookmark = ({ expression }: Props) => {
  const lastState = useRef(expression.bookmark_state)

  return (
    <Icon
      as={lastState.current ? IoBookmark : IoBookmarkOutline} // or IoBookmark
      boxSize={7}
      color={lastState.current ? 'yellow' : ''}
      position='absolute'
      top={1}
      right={1}
      bg='rgba(0,0,0,0.4)'
      borderRadius='full'
      p={1}
      cursor='pointer'
      _hover={{ color: 'yellow.300' }}
    />
  )
}

export default ExpressionBookmark