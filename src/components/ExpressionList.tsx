import { Box, GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import useExpression from '../hooks/useExpression';
import ExpressionItem from './ExpressionItem';

interface Props {
  clipId: number;
}
const ExpressionList = ({clipId}: Props) => {
  const { data, isLoading, error } = useExpression(clipId);

  if (isLoading) return null;
  if (error) throw error;
  return (
    <Box p='15px 10px'>
      <Heading size='md' mb={5}>Expressions</Heading>
      <Box sx={{ columnCount: { base: 1, md: 2, lg: 3, xl: 4 }}}
        columnGap={6}
      >
        {data?.results.map((exp) =>
          <Box key={exp.id} sx={{ breakInside: 'avoid'}} mb={5}>
            <ExpressionItem expression={exp}/>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ExpressionList