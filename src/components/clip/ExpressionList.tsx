import { Box, Heading } from '@chakra-ui/react'
import ExpressionCard from '../ExpressionCard'
import Expression from '../../entities/Expression'

interface Props {
  data: Expression[]
}
const ExpressionList = ({ data }: Props) => {
  return (
    <Box p='15px 10px'>
      <Heading size='md' mb={3} color='gray'>
        Other Expressions
      </Heading>
      <Box 
        sx={{ columnCount: {base: 1, md: 2, lg: 3, xl: 4} }}
        columnGap={6}
      >
        {data?.map((exp) =>
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

export default ExpressionList