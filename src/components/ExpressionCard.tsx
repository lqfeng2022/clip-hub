import {
  AspectRatio,
  Card, CardBody, Divider, Heading,
  Image, ListItem, Text, UnorderedList
} from '@chakra-ui/react'
import Expression from '../entities/Expression'
import CollapseText from './CollapseText'

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
        <Heading fontSize='xl'>
          {expression.title}
        </Heading>
        <Text color='gray.300' py={3}>
          <CollapseText limit={70}>
            {expression.explain}
          </CollapseText>
        </Text>
        <Divider my={2}/>
        <UnorderedList>
          {expression.example.split('\n').map((line, i) => (
            <ListItem key={i} mb='5px'>{line}</ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    </Card>
  )
}

export default ExpressionCard