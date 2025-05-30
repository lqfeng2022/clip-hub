import { Box, Grid, GridItem, HStack, Show } from '@chakra-ui/react'
import ClipGrid from '../components/clip/ClipGrid'
import ClipHeading from '../components/clip/ClipHeading'
import GenreList from '../components/clip/GenreList'
import LangSelector from '../components/clip/LangSelector'
import GenreTags from '../components/clip/GenreTags'
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
          <Show below='md'><GenreTags/></Show>
          <HStack spacing={5} mb={2}>
            <LangSelector/>
            <SortSelector/>
          </HStack>
        </Box>
        <ClipGrid/>
      </GridItem>
    </Grid>
  )
}

export default HomePage
