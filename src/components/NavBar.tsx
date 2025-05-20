import { HStack, Text } from '@chakra-ui/react';
import SearchInput from './SearchInput';

interface Props {
  onSearch: (serchText: string) => void;
}

const NavBar = ({onSearch}: Props) => {
  return (
    <HStack p='10px'>
      <Text>NavBar</Text>
      <SearchInput onSearch={onSearch}/>
    </HStack>
  );
};

export default NavBar;