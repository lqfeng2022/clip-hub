import FormalityTags from '@/components/expression/FormalityTags'
import Langtags from '@/components/expression/Langtags'
import useLanguageStore from '@/languageStore'
import { Box, Divider, Grid, GridItem, Heading, HStack, Show } from '@chakra-ui/react'
import ExpressionGrid from '../components/expression/ExpressionGrid'
import ExpressionSortSelector from '../components/expression/ExpressionSortSelector'
import LangtagsSelector from '../components/expression/LangtagsSelector'
import useExpressionQueryStore from '../expressionStore'
import { useLangtag } from '../hooks/store/useLangtag'
import { expressionPage } from '@/data/expressionPage'

function ExpressionPage() {
  const lang = useLanguageStore(s => s.language)
  const headers = lang === 'en' ? expressionPage.en : expressionPage.zh

  const langtagId = useExpressionQueryStore((s) => s.expressionQuery.tagId)
  const langtag = useLangtag(langtagId)
  const langtag_title = lang === 'en' ? langtag?.title : langtag?.title_ch

  const formalId = useExpressionQueryStore((s) => s.expressionQuery.formal)
  const formality = lang === 'en'
    ? expressionPage.en.formality : expressionPage.zh.formality

  const formality_target = formality.find(tag => tag.name === formalId)
  const formality_title = formality_target?.title

  const header = `${formality_title || ''} ${langtag_title || ''} ${headers.expression_header}`
  
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
            <Divider my={2} borderColor='white'/>
            <Heading fontSize='3xl' py={3}>
              {headers.langtags_header}
            </Heading>
            <FormalityTags />
            <Langtags/>
            {/* <WordsList/> */}
          </Box>
        </GridItem>
      </Show>
      {/* Main for Expressions */}
      <GridItem area='main'>
        <Box px={2}>
          <Heading my={4} fontSize='3xl'>
            {header}
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
