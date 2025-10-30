import useLanguageStore from '@/languageStore'
import { SearchForm, searchSchema } from '@/validation/searchSchema'
import { Badge, Box, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, InputRightElement, Show, useOutsideClick } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import useSearchPost from '../hooks/interact/useSearchPost'
import SearchHistoryBox from './SearchHistoryBox'
import useExpressionQueryStore from '@/expressionStore'
import expressionPageData from '@/data/expressionPageData'

const SearchInput = ({ onClose }: { onClose?: () => void }) => {
  const { user } = useAuth()
  const lang = useLanguageStore(s => s.language)
  const setSearchText = useExpressionQueryStore((s) => s.setSearchText)

  // search context and mutation hooks
  const placeholder = lang === 'en' 
    ? expressionPageData.en.search_box : expressionPageData.zh.search_box
  const { mutate } = useSearchPost()

  const navigate = useNavigate()

  // UI: dropdown focus handling
  const boxRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  useOutsideClick({ ref: boxRef, handler: () => setIsFocused(false) })

  // form handling with RHF + Zod
  const { 
    register, handleSubmit, setValue, formState: { errors, isValid }, reset 
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    mode: 'onChange', // live validation
  })

  // what happens when user submits search
  const onSubmit = (data: SearchForm) => {
    const content = data.content.trim()
    if (!content) return

    setSearchText(content) // update local state
    if (user) mutate({ content, visible: true }) // post to backend

    setIsFocused(false)   // hide <SearchBox />
    if (onClose) onClose()

    navigate('/expressions')

    reset() // clear input if you want
  }

  const onSelectHistory = (value: string) => {
    setValue('content', value)  // programmatically update the input
    setIsFocused(true)          // keep the dropdown open if desired
  }
  
  return (
    <Box position='relative' w='full' ref={boxRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size='md'>
          <InputLeftElement children={<BsSearch />}/>
          <FormControl isInvalid={!!errors.content}>
            <Input
              {...register('content')}
              borderRadius={20}
              fontSize='16px' // stops Safari from auto-zooming
              placeholder={placeholder}
              variant='filled'
              pl='2.5rem'
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>
          <Show above='md'>
            {!isFocused && <InputRightElement>
                <Badge variant='outline' mr={10}>enter</Badge>
              </InputRightElement>
              }
          </Show>
        </InputGroup>
        {isFocused && (
          <SearchHistoryBox onSelect={onSelectHistory}/>
        )}
      </form>
    </Box>
  )
}

export default SearchInput