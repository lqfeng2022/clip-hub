import { Box, Heading } from '@chakra-ui/react'
import Expression from '../entities/Expression'
import ExpressionCard from './expression/ExpressionCard'

interface Props {
  data: Expression[],
  ep: Expression
}
const ExpressionRecommend = ({ data, ep }: Props) => {
  const filtered = data?.filter((exp) => exp.id !== ep.id)

  return (
    <Box p='15px 10px'>
      <Heading size='md' mb={3} color='gray'>
        Other expressions
      </Heading>
      <Box 
        sx={{ columnCount: {base: 1, md: 2, lg: 3, xl: 4} }}
        columnGap={6}
      >
        {filtered?.map((exp) =>
          <Box 
            key={exp.id} 
            sx={{ breakInside: 'avoid' }} 
            mb={5}
          >
            <ExpressionCard expression={exp}/>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ExpressionRecommend