import { Box, Grid, GridItem, Heading, Show } from '@chakra-ui/react'
import ExpressionTags from '../components/ExpressionTags'
import LangIcons from '../components/LangIcons'
import useExpressionQueryStore from '../expressionStore'
import useLanguage from '../hooks/useLanguage'
import ExpressionGrid from '../components/ExpressionGrid'

function ExpressionPage() {
  const languageId = useExpressionQueryStore(
    (s) => s.expressionQuery.languageId
  )
  const language = useLanguage(languageId)

  const heading = `${language?.title || ''} Expressions`
  
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
          <ExpressionTags />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Box>
          <Heading px={2} my={4} fontSize='3xl'>
            {heading}
          </Heading>
          <Show below='lg'>
            <LangIcons />
          </Show>
        </Box>
        <ExpressionGrid/>
      </GridItem>
    </Grid>
  )
}

export default ExpressionPage
