import Expression from '@/entities/Expression'
import { Box, Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ExpressionCardLike from './ExpressionCardLike'
import noImage from '@/assets/no-image.jpg'


interface Props {
  expression: Expression,
  handleJump: (tl: string) => void
}
const ExpressionCardTimeline = ({ expression, handleJump }: Props) => {
  return (
    <Card overflow='hidden' variant=''>
      <Box position='relative'>
        <Image
          w='100%'
          objectFit='cover'
          aspectRatio={ 20 / 9}
          src={expression.image || noImage}
          cursor='pointer'
          className='img-hover'
          onClick={() => handleJump(expression.timeline)}
        />
        <Box
          position='absolute'
          top={1}
          left={1}
          bg='rgba(0,0,0,0.4)'
          px={1}
        >
          {expression.timeline}
        </Box>
      </Box>
      <CardBody py='8px' px={0}>
        <ExpressionCardLike expression={expression}/>
        <Link to={'/expressions/' + expression.slug}>
          <Heading
            fontSize='md'
            color='yellow.200'
            _hover={{ color: 'white' }}
          >
            {expression.title}
          </Heading>
        </Link>
      </CardBody>
    </Card>
  )
}

export default ExpressionCardTimeline