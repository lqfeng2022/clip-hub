import { Heading, Spinner, Tag, Wrap, WrapItem } from '@chakra-ui/react'
import useLanguages from '@/hooks/store/useLanguages'
import useExpressionQueryStore from '@/expressionStore'

const LanguageList = () => {
  const selectedLangId = useExpressionQueryStore(
    (s) => s.expressionQuery.languageId)
  const setSelectLangId = useExpressionQueryStore(
    (s) => s.setLanguageId)
    
  const { data: lang, error, isLoading } = useLanguages()

  if (error) return null
  if (isLoading) return <Spinner />
  return (
    <>
      <Heading fontSize='3xl' pb={3}>Languages</Heading>
      <Wrap spacing={4} p={2}>
      {lang?.results.map((tag) => (
        <WrapItem key={tag.id}>
          {tag.id === selectedLangId ? (
            <Tag 
              size='md' 
              variant='outline' 
              colorScheme='yellow'
              backgroundColor='#4A5568'
              color='white'
              fontWeight='bold'
              onClick={() => setSelectLangId(tag.id)}
              className='tag-hover'
            >
              {tag.title}
            </Tag> ) : (
            <Tag 
              size='md' 
              variant='outline' 
              colorScheme='yellow' 
              fontWeight='normal'
              onClick={() => setSelectLangId(tag.id)}
              className='tag-hover'
            >
              {tag.title}
            </Tag>
          )}
        </WrapItem>
      ))}
      </Wrap>
    </>
  )
}

export default LanguageList