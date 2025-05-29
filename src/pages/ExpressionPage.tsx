import { Box, Heading } from '@chakra-ui/react';
import LangTags from '../components/LangTags';
import ExpressionGrid from '../components/ExpressionGrid';

const ExpressionPage = () => {
  return (
    <Box py={2}>
      <Heading my={4} fontSize='4xl'>
        Expressions
      </Heading>
      <LangTags />
      <ExpressionGrid />
    </Box>
  )
}

export default ExpressionPage