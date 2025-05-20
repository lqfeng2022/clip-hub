import { Genre } from './useGenres';
import useData from './useData';
import { ClipQuery } from '../App';

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

const ClipGrid = (clipQuery: ClipQuery) => useData<Clip>(
  '/videos/',
  {params: {
    genre_id: clipQuery.genre?.id,
    language: clipQuery.language?.id,
    ordering: clipQuery.sortOrder,
    }
  }, 
  [clipQuery],
)

export default ClipGrid;