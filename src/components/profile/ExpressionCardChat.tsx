import { Card, CardBody, Heading, Text, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Expression from '@/entities/Expression'
import noImage from '@/assets/no-image.jpg'
import { pocketURL } from '@/services/pocket'

interface Props {
  expression: Expression,
  messages: number,
}
const ExpressionCardChat = ({ expression, messages }: Props) => {
  return (
    <Card gap={1} overflow='hidden' variant=''>
      <Image
        w='100%'
        borderRadius='md'
        objectFit='cover'
        aspectRatio={ 16/9}
        src={`${pocketURL}${expression.image}` || noImage}
      />
      <Text 
        position='absolute'
        top={1}
        right={1}
        px={1}
        bg='rgba(0,0,0,0.5)'
        borderRadius='5px'
      >
        {messages}
      </Text>
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

export default ExpressionCardChat