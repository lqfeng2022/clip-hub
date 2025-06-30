import useSearchContext from '@/hooks/useSearchContex'
import useLanguageStore from '@/languageStore'
import { Badge, Icon } from '@chakra-ui/react'
import { HiLanguage } from 'react-icons/hi2'

const EpLogo = () => {
  const { isExpression } = useSearchContext()
  const language = useLanguageStore((s) => s.language)

  return (
    <Badge
      variant='subtle'
      fontSize='1em'
      fontWeight='thin'
      colorScheme='gray'
      className='tag-hover'
      textColor='white'
      background={isExpression ? '#4A5568' : '#3f3f3f'}
      >
      <Icon
        as={HiLanguage}
        boxSize={5}
        color='green.300'
        verticalAlign='bottom'
      /> 
      {language === 'en' ? 'expression' : '英文表达式'}
    </Badge>
  )
}

export default EpLogo