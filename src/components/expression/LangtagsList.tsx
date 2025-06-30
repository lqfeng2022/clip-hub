import { Heading, Spinner, Tag, Wrap, WrapItem } from '@chakra-ui/react'
import useLangtags from '@/hooks/store/useLangtags'
import useExpressionQueryStore from '@/expressionStore'
import useLanguageStore from '@/languageStore'

const LangtagsList = () => {
  const lang = useLanguageStore(s => s.language)

  const { data, error, isLoading } = useLangtags()

  const selectedTagId = useExpressionQueryStore(
    (s) => s.expressionQuery.tagId
  )
  const setSelectTagId = useExpressionQueryStore(
    (s) => s.setTagId
  )

  if (error) return null
  if (isLoading) return <Spinner />
  return (
    <>
      <Heading fontSize='3xl' py={3}>
        {lang === 'en' ? 'Tags' : '语言标签'}
      </Heading>
      <Wrap spacing={4} p={2}>
      {data?.results.map((tag) => (
        <WrapItem key={tag.id}>
          {tag.id === selectedTagId ? (
            <Tag 
              size='md' 
              variant='outline' 
              colorScheme='yellow'
              backgroundColor='#4A5568'
              color='white'
              fontWeight='normal'
              onClick={() => setSelectTagId(tag.id)}
              className='tag-hover'
            >
              {lang === 'en' ? tag.title : tag.title_ch}
            </Tag> ) : (
            <Tag 
              size='md' 
              variant='outline' 
              colorScheme='yellow' 
              fontWeight='normal'
              onClick={() => setSelectTagId(tag.id)}
              className='tag-hover'
            >
              {lang === 'en' ? tag.title : tag.title_ch}
            </Tag>
          )}
        </WrapItem>
      ))}
      </Wrap>
    </>
  )
}

export default LangtagsList