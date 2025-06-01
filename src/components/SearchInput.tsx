import { 
  Badge, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  InputRightElement 
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import useClipQueryStore from '../clipStore'
import useExpressionQueryStore from '../expressionStore'

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null)

  const location = useLocation()
  const isExpressionPage = location.pathname.startsWith('/expression')
    
  const setSearchText = isExpressionPage 
    ? useExpressionQueryStore((s) => s.setSearchText) 
    : useClipQueryStore((s) => s.setSearchText)
  const placeholder = `Search ${ isExpressionPage ? 'expressions' : 'clips' }...`

  const navigate = useNavigate()
  
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <form 
      onSubmit={(event) => {
        event.preventDefault()
        if (ref.current) setSearchText(ref.current.value) 
        // console.log(ref.current.value)
        if (!isExpressionPage) navigate('/')
      }}
    >
      <InputGroup size={{ base: 'sm', lg: 'md'}}>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder={placeholder}
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