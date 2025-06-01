import {
  Heading,
  Spinner,
  Tag,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import useExpressionQueryStore from '../expressionStore'
import useLangtags from '../hooks/useLangtags_shabi'

const LangtagsList = () => {
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
        Tags
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
    </>
  )
}

export default LangtagsList