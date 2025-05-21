import { Box, Grid, GridItem, HStack, Show } from '@chakra-ui/react';
import { useState } from 'react';
import ClipGrid from './components/ClipGrid';
import ClipHeading from './components/ClipHeading';
import GenreList from './components/GenreList';
import LanguageSelector from './components/LanguageSelector';
import NavBar from './components/NavBar';
import SortSelector from './components/SortSelector';

export interface ClipQuery {
  genreId: number;
  languageId: number;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [clipQuery, setClipQuery] = useState<ClipQuery>({} as ClipQuery)

  return (
    <Grid
      templateAreas={{
        base: `'nav' 'main'`,
        lg: `'nav nav' 'aside main'`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <GridItem area='nav'>
        <NavBar
          onSearch={(searchText) => setClipQuery(
            {...clipQuery, searchText}
          )}
        />
      </GridItem>
      <Show above='lg'>
        <GridItem area='aside' px={5}>
          <GenreList 
            selectedGenreId={clipQuery.genreId}
            onSelectGenre={
              (genre) => setClipQuery({...clipQuery, genreId: genre.id})
            }
          />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <Box padding={2.5}>
          <ClipHeading clipQuery={clipQuery}/>
          <HStack spacing={5} paddingLeft={2.5} marginBottom={5}>
            <LanguageSelector
              selectedLanguageId={clipQuery.languageId}
              onSelectLanguage={
                (language) => setClipQuery({...clipQuery, languageId: language.id})
              }
              />
            <SortSelector
              sortOrder={clipQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setClipQuery({...clipQuery, sortOrder})
              }
              />
          </HStack>
        </Box>
        <ClipGrid clipQuery={clipQuery}/>
      </GridItem>
    </Grid>
  )
}

export default App
