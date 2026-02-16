import useLanguageStore from '@/stores/languageStore'
import { SearchForm, searchSchema } from '@/validation/searchSchema'
import { Badge, Box, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, InputRightElement, Show, useOutsideClick } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsSearch } from 'react-icons/bs'
import { useAuth } from '../../AuthContext'
import useSearchPost from '../../hooks/interact/useSearchPost'
import SearchHistory from './SearchHistory'
import expressionPageData from '@/data/expressionPageData'
import useProductFilterStore from '@/stores/productFilterStore'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface Props {
  onClose?: () => void
}
const SearchInput = ({ onClose }: Props) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const lang = useLanguageStore(s => s.language)
  const placeholder = lang === 'en' 
    ? expressionPageData.en.search_box : expressionPageData.zh.search_box
  
  // get search context setter and post hook
  const setSearchText = useProductFilterStore((s) => s.setSearchText)
  const { mutate } = useSearchPost()

  // UI: dropdown focus handling
  const boxRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  useOutsideClick({ ref: boxRef, handler: () => setIsFocused(false) })

  // form handling with RHF + Zod
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: 
    { errors, isValid }, 
    reset 
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    mode: 'onChange', // live validation
  })

  // Read Search input paramter from URL
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setValue('content', q)   // update RHF input
    setSearchText(q)         // sync Zustand store
  }, [searchParams, setValue, setSearchText])
  
  // what happens when user submits search
  const onSubmit = (data: SearchForm) => {
    const content = data.content.trim()
    if (!content) return
    
    // Update Zustand state
    setSearchText(content) 

    // Post to backend if user logged in
    if (user) mutate({ content, visible: true })

    // Update URL query param
    navigate(`/search?q=${encodeURIComponent(content)}`)
    // navigate('/search')

    setIsFocused(false)   // hide <SearchBox />
    if (onClose) onClose()
    reset() // clear input if you want
  }

  const onSelectHistory = (value: string) => {
    setValue('content', value)  // programmatically update the input
    setIsFocused(true)          // keep the dropdown open if desired
  }
  
  return (
    <Box position='relative' w='full' ref={boxRef} p={2}>
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
          {!isFocused && <InputRightElement>
            <Badge variant='outline' mr={10}>enter</Badge>
          </InputRightElement>}
        </InputGroup>
        {isFocused && <SearchHistory onSelect={onSelectHistory}/>}
      </form>
    </Box>
  )
}

export default SearchInput