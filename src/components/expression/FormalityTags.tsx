import expressionPage from '@/data/expressionPage'
import useExpressionQueryStore from '@/expressionStore'
import useLanguageStore from '@/languageStore'
import { Tag, Wrap, WrapItem } from '@chakra-ui/react'

const FormalityTags = () => {
  const lang = useLanguageStore(s => s.language)
  
  const formalId = useExpressionQueryStore((s) => s.expressionQuery.formal)
  const setFormalId = useExpressionQueryStore((s) => s.setFormal)

  const formality = lang === 'en' 
    ? expressionPage.en.formality : expressionPage.zh.formality

  return (
    <Wrap spacing={4} py={3}>
    {formality.map((tag) => (
      <WrapItem key={tag.id}>
        {tag.name === formalId ? (
          <Tag 
            size='md' 
            variant='outline' 
            colorScheme='blue'
            backgroundColor='#4A5568'
            color='white'
            fontWeight='bold'
            onClick={() => setFormalId(tag.name)}
            className='tag-hover'
          >
            {tag.title}
          </Tag> ) : (
          <Tag 
            size='md' 
            variant='outline' 
            colorScheme='blue' 
            fontWeight='normal'
            onClick={() => setFormalId(tag.name)}
            className='tag-hover'
          >
            {tag.title}
          </Tag>
        )}
      </WrapItem>
    ))}
    </Wrap>
  )
}

export default FormalityTags