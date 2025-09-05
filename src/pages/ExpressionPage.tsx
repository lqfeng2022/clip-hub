import FormalityTags from '@/components/expression/FormalityTags'
import Langtags from '@/components/expression/Langtags'
import { formality } from '@/helperfunction'
import useLanguageStore from '@/languageStore'
import { Box, Divider, Grid, GridItem, Heading, HStack, Show } from '@chakra-ui/react'
import ExpressionGrid from '../components/expression/ExpressionGrid'
import ExpressionSortSelector from '../components/expression/ExpressionSortSelector'
import LangtagsSelector from '../components/expression/LangtagsSelector'
import useExpressionQueryStore from '../expressionStore'
import { useLangtag } from '../hooks/store/useLangtag'

function ExpressionPage() {
  const lang = useLanguageStore(s => s.language)

  const langtagId = useExpressionQueryStore((s) => s.expressionQuery.tagId)
  const langtag = useLangtag(langtagId)

  const formal = useExpressionQueryStore((s) => s.expressionQuery.formal)
  const formal_target = formality.find(tag => tag.name === formal)

  const header = `${formal_target?.title || ''} ${langtag?.title || ''} Expressions`
  const header_ch = `${formal_target?.title_ch || ''} ${langtag?.title_ch || ''} 表达式`
  
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
              {lang === 'en' ? 'Langtags' : '语言标签'}
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
