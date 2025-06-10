import { Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Epbook from '@/entities/Epbook'

const ExpressionCardSimple = ({ epbook }: { epbook: Epbook }) => {
  return (
    <Card overflow='hidden' variant=''>
      <Image
        w='100%'
        objectFit='cover'
        aspectRatio={ 20 / 9}
        src={epbook.expression.image}
      />
      <CardBody p='5px 8px'>
        <Link to={'/expressions/' + epbook.expression.slug}>
          <Heading 
            fontSize='md' 
            color='yellow.200'
            _hover={{ color: 'white' }}
          >
            {epbook.expression.title}
          </Heading>
        </Link>
      </CardBody>
    </Card>
  )
}

export default ExpressionCardSimple