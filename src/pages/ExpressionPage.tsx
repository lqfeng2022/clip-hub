import { Box, Divider, Grid, GridItem, Heading, HStack, Show } from '@chakra-ui/react'
import { useLangtag } from '../hooks/store/useLangtag'
import useExpressionQueryStore from '../expressionStore'
import ExpressionSortSelector from '../components/expression/ExpressionSortSelector'
import ExpressionGrid from '../components/expression/ExpressionGrid'
import LangtagsSelector from '../components/expression/LangtagsSelector'
import LangtagsList from '../components/expression/LangtagsList'
import useLanguageStore from '@/languageStore'
import FormalityList from '@/components/expression/FormalityList'
import FormalityTags from '@/components/expression/FormalityTags'

function ExpressionPage() {
  const lang = useLanguageStore(s => s.language)

  const langtagId = useExpressionQueryStore((s) => s.expressionQuery.tagId)
  const langtag = useLangtag(langtagId)

  const header = `${langtag?.title || ''} Expressions`
  const header_ch = `${langtag?.title_ch || ''} 表达式`
  
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
      {/* Aside for langtags */}
      <Show above='lg'>
        <GridItem area='aside' px={2.5}>
          <Box mt={8}>
            <Divider my={3} borderColor='white'/>
            <FormalityList/>
            <LangtagsList/>
          </Box>
        </GridItem>
      </Show>
      {/* Main for Expressions */}
      <GridItem area='main'>
        <Box px={2}>
          <Heading my={4} fontSize='3xl'>
            {lang === 'en' ? header : header_ch}
          </Heading>
          <Show below='lg'>
            <FormalityTags/>
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
