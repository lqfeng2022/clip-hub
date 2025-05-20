import { HStack, Text } from '@chakra-ui/react';
import SearchInput from './SearchInput';

interface Props {
  onSearch: (serchText: string) => void;
}

const NavBar = ({onSearch}: Props) => {
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
      <SearchInput onSearch={onSearch}/>
      <Text>Expression</Text>
      <Text>Profile</Text>
    </HStack>
  );
};

export default NavBar;