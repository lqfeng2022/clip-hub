import { Box, Grid, GridItem, HStack, Show } from '@chakra-ui/react'
import ClipGrid from '../components/clip/ClipGrid'
import ClipHeading from '../components/clip/ClipHeading'
import GenreList from '../components/clip/GenreList'
import LanguageSelector from '../components/clip/LanguageSelector'
import GenreHList from '../components/clip/GenreTagList'
import ClipSortSelector from '../components/clip/ClipSortSelector'

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
        <GridItem area='aside' px={2.5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Box px={2}>
          <ClipHeading/>
          <Show below='md'>
            <GenreHList/>
          </Show>
          <HStack spacing={4} mb={1}>
            <LanguageSelector/>
            <ClipSortSelector/>
          </HStack>
        </Box>
        <ClipGrid/>
      </GridItem>
    </Grid>
  )
}

export default HomePage
