import useExpressionQueryStore from '@/expressionStore'
import { formality } from '@/helperfunction'
import useLanguageStore from '@/languageStore'
import { Tag, Wrap, WrapItem } from '@chakra-ui/react'

const FormalityTags = () => {
  const lang = useLanguageStore(s => s.language)
  
  const formal = useExpressionQueryStore((s) => s.expressionQuery.formal)
  const setFormal = useExpressionQueryStore((s) => s.setFormal)

  return (
    <Wrap spacing={4} py={3}>
    {formality.map((tag) => (
      <WrapItem key={tag.id}>
        {tag.name === formal ? (
          <Tag 
            size='md' 
            variant='outline' 
            colorScheme='blue'
            backgroundColor='#4A5568'
            color='white'
            fontWeight='bold'
            onClick={() => setFormal(tag.name)}
            className='tag-hover'
          >
            {lang === 'en' ? tag.title : tag.title_ch}
          </Tag> ) : (
          <Tag 
            size='md' 
            variant='outline' 
            colorScheme='blue' 
            fontWeight='normal'
            onClick={() => setFormal(tag.name)}
            className='tag-hover'
          >
            {lang === 'en' ? tag.title : tag.title_ch}
          </Tag>
        )}
      </WrapItem>
    ))}
    </Wrap>
  )
}

export default FormalityTags