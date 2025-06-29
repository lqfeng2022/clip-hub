import { Box, Grid, GridItem, Show } from '@chakra-ui/react'
import ClipGrid from '../components/clip/ClipGrid'
import ClipHeading from '../components/clip/ClipHeading'
import ClipSortSelector from '../components/clip/ClipSortSelector'
import GenreList from '../components/clip/GenreList'
import GenreHList from '../components/clip/GenreTagList'

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
          <ClipSortSelector/>
        </Box>
        <ClipGrid/>
      </GridItem>
    </Grid>
  )
}

export default HomePage
