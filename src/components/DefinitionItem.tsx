import { Box, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}
const DefinitionItem = ({ term, children }: Props) => {
  return (
    <Box my={2}>
      <Heading fontSize='md' color='gray.500'>
        {term}
      </Heading>
      <Text>{children}</Text>
    </Box>
  );
};

export default DefinitionItem;