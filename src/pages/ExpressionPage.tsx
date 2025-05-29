import { Box, Heading } from '@chakra-ui/react';
import LangTags from '../components/LangTags';

const ExpressionPage = () => {
  return (
    <Box p={2}>
      <Heading my={4} fontSize='4xl'>
        Expressions
      </Heading>
      <LangTags />
    </Box>
  )
}

export default ExpressionPage