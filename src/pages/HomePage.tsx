import { Box, Grid, GridItem, HStack, Show } from '@chakra-ui/react';
import ClipGrid from '../components/ClipGrid';
import ClipHeading from '../components/ClipHeading';
import GenreList from '../components/GenreList';
import LanguageSelector from '../components/LanguageSelector';
import SortSelector from '../components/SortSelector';

function HomePage() {
  return (
    <Grid
      templateAreas={{
        base: `'main'`,
        lg: `'aside main'`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <Show above='lg'>
        <GridItem area='aside' px={5}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Box padding={2.5}>
          <ClipHeading/>
          <HStack spacing={5} pl={2.5} mb={5}>
            <LanguageSelector/>
            <SortSelector/>
          </HStack>
        </Box>
        <ClipGrid/>
      </GridItem>
    </Grid>
  )
}

export default HomePage;
