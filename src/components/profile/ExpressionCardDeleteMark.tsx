import { Box, Card, CardBody, Heading, Icon, Image } from '@chakra-ui/react'
import { IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import Expression from '@/entities/Expression'
import { pocketURL } from '@/services/pocket'

interface Props {
  expression: Expression,
  handleClick: () => void
}
const ExpressionCardDeleteMark = ({ expression, handleClick }: Props) => {
  return (
    <Card 
      bg='gray.800' 
      borderRadius={10} 
      overflow='hidden' 
      variant='unstyled'
    >
      <Box position='relative'>
        <Image
          w='100%'
          objectFit='cover'
          aspectRatio={ 16 / 9}
          src={`${pocketURL}${expression.image}`}
        />
        <Icon 
          as={IoCloseOutline}
          boxSize={7}
          position='absolute'
          top={1}
          right={1}
          cursor='pointer'
          _hover={{ color: 'yellow.200' }}
          onClick={handleClick}
        />
      </Box>
      <CardBody p='8px 4px'>
        <Link to={'/expressions/' + expression.slug}>
          <Heading 
            fontSize='md' 
            noOfLines={2}  
            _hover={{ color: 'yellow.200' }}
          >
            {expression.title}
          </Heading>
        </Link>
      </CardBody>
    </Card>
  )
}

export default ExpressionCardDeleteMark