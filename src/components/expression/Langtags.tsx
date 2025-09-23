import { Box, Tag, Wrap, WrapItem } from '@chakra-ui/react'
import useLangtags from '@/hooks/store/useLangtags'
import useExpressionQueryStore from '@/expressionStore'
import useLanguageStore from '@/languageStore'
import BeatLoader from '../BeatLoader'

const Langtags = () => {
  const { data, error, isLoading } = useLangtags()

  const lang = useLanguageStore(s => s.language)

  const selectedTagId = useExpressionQueryStore(
    (s) => s.expressionQuery.tagId)
  const setSelectTagId = useExpressionQueryStore(
    (s) => s.setTagId)

  if (error) return null
  if (isLoading) return <BeatLoader />
  return (
    <Box 
      flex='1' 
      overflowY='auto' 
      maxH='70vh' 
      pr={3}>
      <Wrap spacing={4} py={2}>
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
    </Box>
  )
}

export default Langtags