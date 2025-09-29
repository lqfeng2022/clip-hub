import Expression from '@/entities/Expression'
import { Heading } from '@chakra-ui/react'

const ExpressionHeader = ({ expression } : { expression: Expression }) => {
  return (
    <Heading pb={7} fontSize='3xl' lineHeight={1.2}>
      {expression.title}
    </Heading>
  )
}

export default ExpressionHeader