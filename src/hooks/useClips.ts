import { Genre } from './useGenres';
import useData from './useData';

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

const ClipGrid = (selectedGenre: Genre | null) => useData<Clip>(
  '/videos/',
  {params: {genre_id: selectedGenre?.id}}, 
  [selectedGenre?.id]
)

export default ClipGrid;