import { Button, Icon } from '@chakra-ui/react'
import useLanguageStore from '@/languageStore'
import { FaLanguage } from 'react-icons/fa'

const LanguageButton = () => {
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)

  return (
    <Button
      colorScheme='gray'
      variant='link'
      onClick={() => setLanguage(language === 'ch' ? 'en' : 'ch')}
    >
      <Icon as={FaLanguage} boxSize='40px' />
    </Button>
  )
}

export default LanguageButton