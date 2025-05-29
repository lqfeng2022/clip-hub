import { 
  Badge, Input, InputGroup, InputLeftElement, InputRightElement 
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import useClipQueryStore from '../clipStore'

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null)
  const setSearchText = useClipQueryStore((s) => s.setSearchText)
  const navigate = useNavigate()
  
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <form 
      onSubmit={(event) => {
        event.preventDefault()
        if (ref.current) setSearchText(ref.current.value) 
        // console.log(ref.current.value)
        navigate('/')
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder='Search videos...'
          variant='filled'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
       {!isFocused && <InputRightElement>
          <Badge variant='outline' mr={10}>enter</Badge>
        </InputRightElement>
        }
      </InputGroup>
    </form>
  )
}

export default SearchInput