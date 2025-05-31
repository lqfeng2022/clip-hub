import { Box, Heading } from '@chakra-ui/react'
import ExpressionGrid from '../components/ExpressionGrid'
import useExpressionQueryStore from '../expressionStore'
import useLanguage from '../hooks/useLanguage'
import LangIcons from '../components/LangIcons'

const ExpressionPage = () => {
  const languageId = useExpressionQueryStore(
    (s) => s.expressionQuery.languageId
  )
  const language = useLanguage(languageId)

  const heading = `${language?.title || ''} Expressions`

  return (
    <Box py={2}>
      <Heading px={2} my={4} fontSize='3xl'>
        {heading}
      </Heading>
      <LangIcons />
      <ExpressionGrid />
    </Box>
  )
}

export default ExpressionPage