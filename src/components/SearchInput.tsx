import { Badge, Box, Input, InputGroup, InputLeftElement, InputRightElement, useOutsideClick } from '@chakra-ui/react'
import { FormEvent, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import useSearchContext from '../hooks/useSearchContex'
import useSearchPost from '../hooks/interact/useSearchPost'
import SearchBox from './SearchBox'

const SearchInput = ({ onClose }: { onClose?: () => void }) => {
  const { user } = useAuth()
  // get search context type from searchContext hook
  const { isExpression, placeholder, setSearchText, type } = useSearchContext()
  const { mutate } = useSearchPost()
  const navigate = useNavigate()
  
  // points to input element, then read it or whatever you want
  const boxRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  
  useOutsideClick({ ref: boxRef, handler: () => setIsFocused(false) })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!inputRef.current) return

    const content = inputRef.current.value.trim()
    if (!content) return

    setSearchText(content) // Update local search state
    inputRef.current.blur() // This hides the keyboard on mobile and collapses UI

    // Post new search record to backend
    if (user) mutate({ content, type, visible: true })
    if (onClose) onClose()
    if (!isExpression) navigate('/')  // Optional navigation
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
            onBlur={() => setIsFocused(false)}
          />
         {!isFocused && <InputRightElement>
            <Badge variant='outline' mr={10}>enter</Badge>
          </InputRightElement>
          }
        </InputGroup>
        {isFocused && <SearchBox type={type}/>}
      </form>
    </Box>
  )
}

export default SearchInput