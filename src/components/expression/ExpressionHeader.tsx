import Expression from '@/entities/Expression'
import { Heading } from '@chakra-ui/react'

const ExpressionHeader = ({ expression } : { expression: Expression }) => {
  return (
    <Heading pb={7} fontSize='4xl' lineHeight={1}>
      {expression.title}
    </Heading>
  )
}

export default ExpressionHeader