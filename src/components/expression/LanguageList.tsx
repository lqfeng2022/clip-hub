import { Heading, Spinner, Tag, Wrap, WrapItem } from '@chakra-ui/react'
import useExpressionQueryStore from '../../expressionStore'
import useLanguages from '../../hooks/store/useLanguages'

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
          <Tag 
            size='md' 
            variant='outline' 
            colorScheme='yellow' 
            fontWeight={tag.id === selectedLangId 
              ? 'bold' : 'normal'
            }
            onClick={() => setSelectLangId(tag.id)}
            className='tag-hover'
          >
            {tag.title}
          </Tag>
        </WrapItem>
      ))}
      </Wrap>
    </>
  )
}

export default LanguageList