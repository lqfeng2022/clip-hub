import { Box, Grid, GridItem, Heading, Show } from '@chakra-ui/react'
import ExpressionTagsList from '../components/ExpressionTagsList'
import LanguageHList from '../components/LanguageHList'
import useExpressionQueryStore from '../expressionStore'
import useLanguage from '../hooks/useLanguage'
import ExpressionGrid from '../components/ExpressionGrid'
import { useLangtag } from '../hooks/useLangtag'

function ExpressionPage() {
  const languageId = useExpressionQueryStore(
    (s) => s.expressionQuery.languageId
  )
  const langtagId = useExpressionQueryStore(
    (s) => s.expressionQuery.tagId
  )

  const language = useLanguage(languageId)
  const langtag = useLangtag(langtagId)

  const heading = `
    ${language?.title || ''} 
    ${langtag?.title || ''} 
    Expressions
  `
  
  return (
    <Grid
      templateAreas={{
        base: `'main'`,
        lg: `'aside main'`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '320px 1fr',
      }}
    >
      <Show above='lg'>
        <GridItem area='aside' px={5}>
          <ExpressionTagsList />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Box>
          <Heading my={4} fontSize='3xl'>
            {heading}
          </Heading>
          <Show below='lg'>
            <LanguageHList />
          </Show>
        </Box>
        <ExpressionGrid/>
      </GridItem>
    </Grid>
  )
}

export default ExpressionPage
