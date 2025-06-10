import { Box, Divider, Grid, GridItem, Heading, HStack, Show } from '@chakra-ui/react'
import ExpressionGrid from '../components/expression/ExpressionGrid'
import ExpressionSortSelector from '../components/expression/ExpressionSortSelector'
import LangtagsSelector from '../components/expression/LangtagsSelector'
import LanguageHList from '../components/expression/LanguageHList'
import useExpressionQueryStore from '../expressionStore'
import { useLangtag } from '../hooks/useLangtag'
import useLanguage from '../hooks/useLanguage'
import LangtagsList from '../components/expression/LangtagsList'
import LanguageList from '../components/expression/LanguageList'

function ExpressionPage() {
  const languageId = useExpressionQueryStore(
    (s) => s.expressionQuery.languageId)
  const langtagId = useExpressionQueryStore(
    (s) => s.expressionQuery.tagId)

  const language = useLanguage(languageId)
  const langtag = useLangtag(langtagId)

  const heading = `${language?.title || ''} ${langtag?.title || ''} Expressions`
  
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
      {/* Aside list (languages/langtags) */}
      <Show above='lg'>
        <GridItem area='aside' px={2.5}>
          <Box mt={8}>
            <Divider my={3} borderColor='white'/>
            <LanguageList/>
            <LangtagsList/>
          </Box>
        </GridItem>
      </Show>
      {/* Main for Expressions */}
      <GridItem area='main'>
        <Box px={2}>
          <Heading my={4} fontSize='3xl'>
            {heading}
          </Heading>
          <Show below='lg'>
            <LanguageHList />
          </Show>
          <HStack spacing={4} mt={2}>
            <Show below='lg'>
              <LangtagsSelector/>
            </Show>
            <ExpressionSortSelector/>
          </HStack>
        </Box>
        {/* Expression grid cards */}
        <ExpressionGrid/>
      </GridItem>
    </Grid>
  )
}

export default ExpressionPage
