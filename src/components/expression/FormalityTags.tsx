import useExpressionQueryStore from '@/expressionStore'
import useLanguageStore from '@/languageStore'
import { Tag, Wrap, WrapItem } from '@chakra-ui/react'

const FormalityTags = () => {
  const formality = [
    { id: 1, title: 'FORMAL', title_ch: '正式的' },
    { id: 2, title: 'NEUTRAL', title_ch: '中性的' },
    { id: 3, title: 'CASUAL', title_ch: '随意的' },
  ]

  const lang = useLanguageStore(s => s.language)
  
  const formal = useExpressionQueryStore((s) => s.expressionQuery.formal)
  const setFormal = useExpressionQueryStore((s) => s.setFormal)

  return (
    <Wrap spacing={4} py={2}>
    {formality.map((tag) => (
      <WrapItem key={tag.id}>
        {tag.title === formal ? (
          <Tag 
            size='md' 
            variant='outline' 
            colorScheme='blue'
            backgroundColor='#4A5568'
            color='white'
            fontWeight='bold'
            onClick={() => setFormal(tag.title)}
            className='tag-hover'
          >
            {lang === 'en' ? tag.title : tag.title_ch}
          </Tag> ) : (
          <Tag 
            size='md' 
            variant='outline' 
            colorScheme='blue' 
            fontWeight='normal'
            onClick={() => setFormal(tag.title)}
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