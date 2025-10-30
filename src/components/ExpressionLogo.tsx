import expressionPageData from '@/data/expressionPageData'
import useLanguageStore from '@/languageStore'
import { Badge, Icon } from '@chakra-ui/react'
import { TbMessageLanguage } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'

const ExpressionLogo = () => {
  const location = useLocation()
  const isExpression = location.pathname.startsWith('/expression')

  const lang = useLanguageStore(s => s.language)
  const content = lang === 'en' 
    ? expressionPageData.en.navbar : expressionPageData.zh.navbar

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

export default ExpressionLogo