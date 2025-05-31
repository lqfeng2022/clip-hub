import {
  Box,
  Divider,
  Heading,
  Spinner,
  Tag,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import useLanguages from '../hooks/useLanguages'
import useLangtags from '../hooks/useLangtags_shabi'
import useExpressionQueryStore from '../expressionStore'

const ExpressionTags = () => {
  const { data, error, isLoading } = useLangtags()

  const { data: lang } = useLanguages()
  const selectedLangId = useExpressionQueryStore(
    (s) => s.expressionQuery.languageId
  )
  const setSelectLangId = useExpressionQueryStore(
    (s) => s.setLanguageId
  )

  const selectedTagId = useExpressionQueryStore(
    (s) => s.expressionQuery.tagId
  )
  const setSelectTagId = useExpressionQueryStore(
    (s) => s.setTagId
  )


  if (error) return null
  if (isLoading) return <Spinner />
  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <Heading fontSize='3xl' pb={3}>
        Language tags
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
      </Wrap>
      <Heading fontSize='3xl' py={3}>
        Content tags
      </Heading>
      <Wrap spacing={4} p={2}>
      { data?.results.map((tag) => (
        <WrapItem key={tag.id}>
          <Tag 
            size='md' 
            variant='outline' 
            colorScheme='gray'
            fontWeight={tag.id === selectedTagId ? 'bold' : 'normal'}
            onClick={() => setSelectTagId(tag.id)}
            className='tag-hover'
          >
            {tag.title}
          </Tag>
        </WrapItem>
      ))}
      </Wrap>
    </Box>
  )
}

export default ExpressionTags