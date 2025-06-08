import { Badge, Box, Input, InputGroup, InputLeftElement, InputRightElement, useOutsideClick } from '@chakra-ui/react'
import { FormEvent, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import useClipQueryStore from '../clipStore'
import useExpressionQueryStore from '../expressionStore'
import SearchBox from './SearchBox'
import useSearchPost from '../hooks/useSearchPost'

const SearchInput = () => {
  const location = useLocation()
  const isExpressionPage = location.pathname.startsWith('/expression')

  const setSearchText = isExpressionPage 
  ? useExpressionQueryStore((s) => s.setSearchText) 
  : useClipQueryStore((s) => s.setSearchText)
  const placeholder = `Search ${ isExpressionPage ? 'expressions' : 'clips' }...`
  
  // points to the container element — used to detect outside clicks.
  const boxRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  useOutsideClick({ ref: boxRef, handler: () => setIsFocused(false) })
  
  // points directly to the input element — used to read or manipulate the input’s value/focus.
  const inputRef = useRef<HTMLInputElement>(null)
  const { mutate } = useSearchPost()
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!inputRef.current) return

    const content = inputRef.current.value.trim()
    if (!content) return

    setSearchText(content) // Update local search state

    // Post new search record to backend
    mutate({
      content,
      type: isExpressionPage ? 'WORDS' : 'CLIP',
      visible: true,
    })

    if (!isExpressionPage) navigate('/')  // Optional navigation
  }
  
  return (
    <Box position='relative' w='full' ref={boxRef}>
      <form onSubmit={handleSubmit}>
        <InputGroup size={{ base: 'sm', lg: 'md'}}>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={inputRef}
            borderRadius={20}
            placeholder={placeholder}
            variant='filled'
            onFocus={() => setIsFocused(true)}
          />
         {!isFocused && <InputRightElement>
            <Badge variant='outline' mr={10}>enter</Badge>
          </InputRightElement>
          }
        </InputGroup>
        {isFocused && 
          <SearchBox type={isExpressionPage ? 'WORDS' : 'CLIP'}/>
        }
      </form>
    </Box>
  )
}

export default SearchInput