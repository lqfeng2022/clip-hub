import { Box } from '@chakra-ui/react'
import Expression from '../entities/Expression'
import ExpressionCard from './expression/ExpressionCard'

const ClipExpression = ({ data }: { data: Expression[] }) => {
  return (
    <Box 
      sx={{ columnCount: 2 }}
      columnGap={6}
      py='10px'
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
  )
}

export default ClipExpression