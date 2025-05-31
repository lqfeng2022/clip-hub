import {
  Box,
  Divider,
  Heading,
  Spinner,
  Tag,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import useLangTags from '../hooks/useLangTags'
import useLanguages from '../hooks/useLanguages'
import useExpressionQueryStore from '../expressionStore'

const ExpressionTags = () => {
  const { data, error, isLoading } = useLangTags()

  const { data: lang } = useLanguages()
  const selectedLangId = useExpressionQueryStore(
    (s) => s.expressionQuery.languageId
  )
  const setSelectLangId = useExpressionQueryStore(
    (s) => s.setLanguageId
  )

  if (error) return null
  if (isLoading) return <Spinner />
  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <Heading fontSize='3xl' pb={3}>
        Expression tags
      </Heading>
      <Wrap spacing={4} p={2}>
      { lang?.results.map((tag) => (
        <WrapItem key={tag.id}>
          <Tag 
            size='md' 
            variant='outline' 
            colorScheme='yellow' 
            fontWeight={tag.id === selectedLangId ? 'bold' : 'normal'}
            onClick={() => setSelectLangId(tag.id)}
            className='tag-hover'
          >
            {tag.title}
          </Tag>
        </WrapItem>
      ))}
      { data?.results.map((tag) => (
        <WrapItem key={tag.id}>
          <Tag size='md' variant='outline' colorScheme='gray'>
            {tag.title}
          </Tag>
        </WrapItem>
      ))}
      </Wrap>
    </Box>
  )
}

export default ExpressionTags