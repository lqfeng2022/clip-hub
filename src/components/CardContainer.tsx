import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const CardContainer = ({ children }: Props) => {
  return (
    <Box 
      borderRadius={10} 
      overflow='hidden'
      _hover={{
        transform: 'scale(1.02)',
        transition: 'transform .25s ease-in',
      }}
    >
      {children}
    </Box>
  );
};

export default CardContainer;
