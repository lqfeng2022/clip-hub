import { Box, Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Expression from '@/entities/Expression'
import ExpressionBookmark from './ExpressionBookmark'
import noImage from '@/assets/no-image.jpg'

interface Props {
  expression: Expression,
  onUnmark?: () => void, // optional callback
}
const ExpressionCard = ({ expression, onUnmark }: Props) => {
  const detail = false

  return (
    <Card gap={1} my={1} overflow='hidden' variant=''>
      <Box position='relative'>
        <Image
          w='100%'
          objectFit='cover'
          src={expression.image || noImage}
        />
        <ExpressionBookmark
          detail={detail}
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