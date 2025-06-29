import { Creator } from './Creator'
import Expression from './Expression'
import Genre from './Genre'
import Movie from './Movie'
import Platform from './Platform'
import Tag from './Tag'

export default interface Clip {
  id: number,
  title: string,
  slug: string,
  description: string,
  cover: string,
  genre: Genre,
  tags: Tag[],
  original: string,
  creator: Creator,
  platform: Platform,
  release_year: number,
  type: 'SHORT' | 'NORMAL',
  movies: Movie[],
  likes_count: number,
  views_count: number,
  like_state: boolean,
  bookmark_state: boolean,
  expressions: Expression[],
}
