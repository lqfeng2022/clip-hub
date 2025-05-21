import Genre from './Genre';
import Tags from './Tag';

export default interface Clip {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover: string;
  genre: Genre;
  tags: Tags[];
}
