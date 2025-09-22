import { expressionPage } from '@/data/expressionPage'
import useSearchContext from '@/hooks/interact/useSearchContex'
import useLanguageStore from '@/languageStore'
import { Badge, Icon } from '@chakra-ui/react'
import { TbMessageLanguage } from 'react-icons/tb'

const EpLogo = () => {
  const { isExpression } = useSearchContext()
  const lang = useLanguageStore(s => s.language)
  const content = lang === 'en' 
    ? expressionPage.en.navbar : expressionPage.zh.navbar

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
        as={TbMessageLanguage}
        boxSize={6}
        color='green.300'
        verticalAlign='bottom'
      /> 
      {content}
    </Badge>
  )
}

export default EpLogo