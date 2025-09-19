import { Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Expression from '@/entities/Expression'
import noImage from '@/assets/no-image.jpg'
import { pocketURL } from '@/services/pocket'

const ExpressionCardSimple = ({ expression }: { expression: Expression }) => {
  return (
    <Card gap={1} overflow='hidden' variant=''>
      <Image
        w='100%'
        borderRadius='lg'
        objectFit='cover'
        aspectRatio={ 16/9}
        src={`${pocketURL}${expression.image}` || noImage}
      />
      <CardBody p='5px'>
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