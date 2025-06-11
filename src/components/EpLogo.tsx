import useSearchContext from '@/hooks/useSearchContex'
import { Badge, Icon } from '@chakra-ui/react'
import { TbLanguageKatakana } from 'react-icons/tb'

const EpLogo = () => {
  const { isExpression } = useSearchContext()

  return (
    <Badge
      variant='subtle'
      fontSize='1em'
      fontWeight='thin'
      colorScheme='gray'
      className='tag-hover'
      textColor={isExpression ? 'white' : 'gray'}
      background={isExpression ? '#4A5568' : '#3f3f3f'}
      >
      <Icon
        as={TbLanguageKatakana}
        boxSize={5}
        color='green.300'
        verticalAlign='bottom'
      /> 
      expression
    </Badge>
  )
}

export default EpLogo