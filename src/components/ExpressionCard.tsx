import {
  Box,
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
import ExpressionBookmark from './ExpressionBookmark'

interface Props {
  expression: Expression
}
const ExpressionCard = ({ expression }: Props) => {
  const location = useLocation()
  const isExpressionPage = location.pathname.startsWith('/expression')

  return (
    <Card gap={2} my={1} overflow='hidden' variant=''>
      <Box position='relative'>
        <Image
          w='100%'
          objectFit='cover'
          src={expression.image}
        />
        <ExpressionBookmark expression={expression} />
      </Box>
      <TagList tags={expression.langtags} color={'teal'}/>
      <CardBody p='5px 8px'>
        <Link to={'/expressions/' + expression.slug}>
          <Heading pb={2} fontSize='xl' color='yellow.200'>
            {expression.title}
          </Heading>
        </Link>
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
                _hover={{ color: 'yellow', cursor: 'pointer' }}
              >
                {`-- Original Video`}
              </Text>
            </Link>
          </HStack>
        }
        <Text color='gray.300' py={3}>
          <CollapseText limit={60}>
            {expression.explain}
          </CollapseText>
        </Text>
      </CardBody>
    </Card>
  )
}

export default ExpressionCard