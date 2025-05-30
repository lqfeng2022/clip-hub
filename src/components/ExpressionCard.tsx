import {
  AspectRatio,
  Card, CardBody,
  Heading,
  HStack,
  Icon,
  Image,
  Text
} from '@chakra-ui/react'
import Expression from '../entities/Expression'
import CollapseText from './CollapseText'
import { ImQuotesLeft } from "react-icons/im";

interface Props {
  expression: Expression
}
const ExpressionCard = ({expression}: Props) => {
  return (
    <Card gap={3} my={1} overflow='hidden' variant=''>
      <AspectRatio ratio={ 16 / 9 }>
        <Image
          maxH='xs'
          objectFit='cover'
          src={expression.image}
        />
      </AspectRatio>
      <CardBody p='5px 8px'>
        <Heading pb={2} fontSize='xl' color='yellow.200'>
          {expression.title}
        </Heading>
        <HStack align='flex-start' wrap='wrap'>
          <Icon as={ImQuotesLeft}/>
          <Heading fontSize='md' flex='1' noOfLines={3}>
            {expression.word}
          </Heading>
        </HStack>
        <Text color='gray.300' py={3}>
          <CollapseText limit={72}>
            {expression.explain}
          </CollapseText>
        </Text>
      </CardBody>
    </Card>
  )
}

export default ExpressionCard