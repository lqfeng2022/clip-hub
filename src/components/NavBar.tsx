import { HStack, Text } from '@chakra-ui/react';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <HStack p='10px' gap={5} justifyContent='space-between'>
      <Link to='/'>
        <Text as='b' fontSize='xl' color='yellow' whiteSpace='nowrap'>
          C L I P s
        </Text>
      </Link>
      <SearchInput/>
      <Text>Profile</Text>
    </HStack>
  );
};

export default NavBar;