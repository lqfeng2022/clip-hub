import { Box, Grid, GridItem, HStack, Show } from '@chakra-ui/react'
import ClipGrid from '../components/clip/ClipGrid'
import ClipHeading from '../components/clip/ClipHeading'
import GenreList from '../components/clip/GenreList'
import LanguageSelector from '../components/clip/LanguageSelector'
import GenreStacks from '../components/clip/GenreStacks'
import SortSelector from '../components/clip/SortSelector'

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
