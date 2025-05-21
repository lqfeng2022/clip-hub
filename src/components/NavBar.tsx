import { HStack, Text } from '@chakra-ui/react';
import SearchInput from './SearchInput';

const NavBar = () => {
  return (
    <HStack p='10px' gap={5}>
      <Text 
        as='b' 
        fontSize='xl' 
        color='yellow' 
        whiteSpace='nowrap'
      >
        C L I P s
      </Text>
      <SearchInput/>
      <Text>Profile</Text>
    </HStack>
  );
};

export default NavBar;