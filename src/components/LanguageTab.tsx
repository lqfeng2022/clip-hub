import { Button, Icon } from '@chakra-ui/react'
import { FaLanguage } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const LanguageTab = () => {
  const navigate = useNavigate()

  return (
    <Button
      colorScheme='gray'
      variant='link'
      onClick={() => navigate('/languages')}
      _hover={{ color: 'yellow.200' }}
    >
      <Icon as={FaLanguage} boxSize='40px'/>
    </Button>
  )
}

export default LanguageTab