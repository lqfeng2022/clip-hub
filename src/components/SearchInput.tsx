import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import useClipQueryStore from '../store';

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useClipQueryStore((s) => s.setSearchText)
  
  return (
    <form 
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) setSearchText(ref.current.value); 
        // console.log(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder='Search videos...'
          variant='filled'
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;