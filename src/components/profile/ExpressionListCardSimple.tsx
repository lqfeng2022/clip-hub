import List from '@/entities/List'
import { Card, CardBody } from '@chakra-ui/react'
import ExpressionListCardCover from './ExpressionListCardCover'
import ExpressionListCardHeader from './ExpressionListCardHeader'

const ExpressionListCardSimple = ({ list }: { list: List }) => {
  return (
    <Card 
      bg='gray.800' 
      overflow='hidden' 
      variant='unstyled' 
      borderRadius={8}
    >
      <ExpressionListCardCover list={list}/>
      <CardBody p='4px'>
        <ExpressionListCardHeader list={list}/>
      </CardBody>
    </Card>
  )
}

export default ExpressionListCardSimple