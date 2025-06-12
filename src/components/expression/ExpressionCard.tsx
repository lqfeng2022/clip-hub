import { Box, Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Expression from '@/entities/Expression'
import ExpressionBookmark from './ExpressionBookmark'

interface Props {
  expression: Expression,
  onUnmark?: () => void, // optional callback
}
const ExpressionCard = ({ expression, onUnmark }: Props) => {
  return (
    <Card gap={1} my={1} overflow='hidden' variant=''>
      <Box position='relative'>
        <Image
          w='100%'
          objectFit='cover'
          src={expression.image}
        />
        <ExpressionBookmark 
          expression={expression} 
          onUnmark={onUnmark}
        />
      </Box>
      <CardBody p='5px'>
        <Link to={'/expressions/' + expression.slug}>
          <Heading
            pb={2}
            fontSize='xl'
            color='yellow.200'
            _hover={{ color: 'white'}}
          >
            {expression.title}
          </Heading>
        </Link>
      </CardBody>
    </Card>
  )
}

export default ExpressionCard