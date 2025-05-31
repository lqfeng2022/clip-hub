import {
  Card, CardBody,
  Heading,
  HStack,
  Icon,
  Image,
  Text
} from '@chakra-ui/react'
import { ImQuotesLeft } from 'react-icons/im'
import { Link, useLocation } from 'react-router-dom'
import Expression from '../entities/Expression'
import CollapseText from './CollapseText'
import TagList from './clip/TagList'

interface Props {
  expression: Expression
}
const ExpressionCard = ({ expression }: Props) => {
  const location = useLocation()
  const isExpressionPage = location.pathname.startsWith('/expression')

  return (
    <Card gap={2} my={1} overflow='hidden' variant=''>
      <Image
        maxH='xs'
        objectFit='cover'
        src={expression.image}
      />
      <TagList tags={expression.langtags} color={'teal'}/>
      <CardBody p='5px 8px'>
        <Heading pb={2} fontSize='xl' color='yellow.200'>
          {expression.title}
        </Heading>
        <HStack align='flex-start' wrap='wrap'>
          <Icon as={ImQuotesLeft}/>
          <Heading fontSize='md' flex='1'>
            {expression.word}
          </Heading>
        </HStack>
        { isExpressionPage && 
          <HStack justifyContent='end' pt={2}>
            <Link to={`/clips/${expression.video}`}>
              <Text
                fontWeight='light'
                _hover={{ fontWeight: 'bold', color: 'yellow', cursor: 'pointer' }}
              >
                {`-- Original Video`}
              </Text>
            </Link>
          </HStack>
        }
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