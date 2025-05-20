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

const ClipGrid = () => useData<Clip>('/videos/')

export default ClipGrid;