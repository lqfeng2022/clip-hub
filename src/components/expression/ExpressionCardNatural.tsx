import { Box, Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Expression from '@/entities/Expression'
import ExpressionCardLike from './ExpressionCardLike'
import noImage from '@/assets/no-image.jpg'
import { pocketURL } from '@/services/pocket'

interface Props {
  expression: Expression,
  onUnmark?: () => void, // optional callback
}
const ExpressionCardNatural = ({ expression, onUnmark }: Props) => {
  return (
    <Card gap={1} my={1} overflow='hidden' variant=''>
      <Box borderRadius='md' overflow='hidden'>
        <Image
          w='100%'
          objectFit='cover'
          src={`${pocketURL}${expression.image}` || noImage}
        />
        <ExpressionCardLike
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

export default ExpressionCardNatural