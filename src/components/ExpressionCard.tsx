import {
  Box,
  Card, CardBody,
  Heading,
  Image
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Expression from '../entities/Expression'
import ExpressionBookmark from './ExpressionBookmark'

interface Props {
  expression: Expression
}
const ExpressionCard = ({ expression }: Props) => {
  return (
    <Card gap={2} my={1} overflow='hidden' variant=''>
      <Box position='relative'>
        <Image
          w='100%'
          objectFit='cover'
          src={expression.image}
        />
        <ExpressionBookmark expression={expression} />
      </Box>
      <CardBody p='5px 8px'>
        <Link to={'/expressions/' + expression.slug}>
          <Heading pb={2} fontSize='xl' color='yellow.200'>
            {expression.title}
          </Heading>
        </Link>
      </CardBody>
    </Card>
  )
}

export default ExpressionCard