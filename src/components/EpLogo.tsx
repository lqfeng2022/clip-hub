import useSearchContext from '@/hooks/useSearchContex'
import { Badge, Icon } from '@chakra-ui/react'
import { HiLanguage } from 'react-icons/hi2'

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
        as={HiLanguage}
        boxSize={5}
        color='green.300'
        verticalAlign='bottom'
      /> 
      expression
    </Badge>
  )
}

export default EpLogo