import { Grid, GridItem, HStack, Show } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import ClipGrid from './components/ClipGrid'
import GenreList from './components/GenreList'
import { Genre } from './hooks/useGenres';
import { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import { Language } from './hooks/useLanguages';
import SortSelector from './components/SortSelector';

export interface ClipQuery {
  genre: Genre | null;
  language: Language | null;
  sortOrder: string;
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
        <NavBar/>
      </GridItem>
      <Show above='lg'>
        <GridItem area='aside' px={5}>
          <GenreList 
            selectedGenre={clipQuery.genre}
            onSelectGenre={
              (genre) => setClipQuery({...clipQuery, genre})
            }
          />
        </GridItem>
      </Show>
      <GridItem area='main'>
        <HStack spacing={5} paddingLeft={2.5} marginBottom={5}>
          <SortSelector
            sortOrder={clipQuery.sortOrder}
            onSelectSortOrder={(sortOrder) => 
              setClipQuery({...clipQuery, sortOrder})
            }
            />
          <LanguageSelector
            selectedLanguage={clipQuery.language}
            onSelectLanguage={
              (language) => setClipQuery({...clipQuery, language})
            }
          />
        </HStack>
        <ClipGrid clipQuery={clipQuery}
        />
      </GridItem>
    </Grid>
  )
}

export default App
