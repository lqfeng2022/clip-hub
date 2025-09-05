import { Box } from '@chakra-ui/react'
import Expression from '../entities/Expression'
import ExpressionCardNatural from './expression/ExpressionCardNatural'

const ClipExpression = ({ data }: { data: Expression[] }) => {
  return (
    <Box 
      sx={{ columnCount: 2 }}
      columnGap={6}
      py='8px'
    >
      {data?.map((exp) =>
        <Box 
          key={exp.id} 
          sx={{ breakInside: 'avoid' }} 
          mb={5}
        >
          <ExpressionCardNatural expression={exp}/>
        </Box>
      )}
    </Box>
  )
}

export default ClipExpression