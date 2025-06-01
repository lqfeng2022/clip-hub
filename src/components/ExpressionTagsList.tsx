import { Box, Divider } from '@chakra-ui/react'
import LangtagsList from './LangtagsList'
import LanguageList from './LanguageList'

const ExpressionTagsList = () => {
  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <LanguageList/>
      <LangtagsList/>
    </Box>
  )
}

export default ExpressionTagsList