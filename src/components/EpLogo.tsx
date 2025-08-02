import useSearchContext from '@/hooks/interact/useSearchContex'
import useLanguageStore from '@/languageStore'
import { Badge, Icon } from '@chakra-ui/react'
import { HiLanguage } from 'react-icons/hi2'

const EpLogo = () => {
  const { isExpression } = useSearchContext()

  const lang = useLanguageStore((s) => s.language)
  const expression = lang === 'en' ? 'expression' : '英文表达式'

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
      {expression}
    </Badge>
  )
}

export default EpLogo