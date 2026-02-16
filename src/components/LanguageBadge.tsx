import { Box, Text } from '@chakra-ui/react'
import useLanguageStore from '@/stores/languageStore'

const LanguageBadge = () => {
  const language = useLanguageStore((s) => s.language)

  const short = language.split('-')[0].toUpperCase()

  return (
    <Box
      position='absolute'
      top='5px'
      right='-10px'
      px='5px'
      py='1px'
      borderRadius='sm'
    >
      <Text fontSize='10px'>
        {short}
      </Text>
    </Box>
  )
}

export default LanguageBadge