import { Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Expression from '@/entities/Expression'

const ExpressionCardSimple = ({ expression }: { expression: Expression }) => {
  return (
    <Card overflow='hidden' variant=''>
      <Image
        w='100%'
        objectFit='cover'
        aspectRatio={ 20 / 9}
        src={expression.image}
      />
      <CardBody p='5px 8px'>
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

export default ExpressionCardSimple