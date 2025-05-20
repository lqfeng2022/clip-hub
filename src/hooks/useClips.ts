import { Genre } from './useGenres';
import useData from './useData';
import { Language } from './useLanguages';

export interface Tags {
  id: number;
  title: string;
  slug: string;
}

export interface Clip {
  id: number;
  title: string;
  cover: string;
  genre: Genre;
  tags: Tags[];
}

const ClipGrid = (
  selectedGenre: Genre | null, 
  selectedLanguage: Language | null) => useData<Clip>(
  '/videos/',
  {params: {
    genre_id: selectedGenre?.id,
    languages: selectedLanguage?.id
    }
  }, 
  [selectedGenre?.id, selectedLanguage?.id]
)

export default ClipGrid;