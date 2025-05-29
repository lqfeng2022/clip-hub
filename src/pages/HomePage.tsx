import { Box, Grid, GridItem, HStack, Show } from '@chakra-ui/react'
import ClipGrid from '../components/ClipGrid'
import ClipHeading from '../components/ClipHeading'
import GenreList from '../components/GenreList'
import LanguageSelector from '../components/LanguageSelector'
import SortSelector from '../components/SortSelector'
import GenreStacks from '../components/GenreStacks'

function HomePage() {
  return (
    <Grid
      templateAreas={{
        base: `'main'`,
        lg: `'aside main'`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '250px 1fr',
      }}
    >
      <Show above='lg'>
        <GridItem area='aside' px={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Box padding={2}>
          <ClipHeading/>
          <Show below='md'><GenreStacks/></Show>
          <HStack spacing={5} mb={2}>
            <LanguageSelector/>
            <SortSelector/>
          </HStack>
        </Box>
        <ClipGrid/>
      </GridItem>
    </Grid>
  )
}

export default HomePage
