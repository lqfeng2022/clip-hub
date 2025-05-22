import {
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  Image,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import Expression from '../entities/Expression';
import { HiOutlineCube } from 'react-icons/hi2';

interface Props {
  expression: Expression;
}
const ExpressionItem = ({expression}: Props) => {
  return (
    <Card gap={3} overflow='hidden' variant=''>
      <Image 
        maxH='md'
        objectFit='cover'
        src={expression.image} 
      />
      <CardBody p='8px 5px'>
        <HStack>
          <Icon as={HiOutlineCube} boxSize={5}/>
          <Heading fontSize='xl' color='yellow.300'>
            {expression.title}
          </Heading>
        </HStack>
        <Text color='gray.300' py={3}>
          {expression.explain}
        </Text>
        <UnorderedList>
          {expression.example.split('\n').map((line, i) => (
            <ListItem key={i} mb='5px'>{line}</ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    </Card>
  )
}

export default ExpressionItem