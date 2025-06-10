import { Creator } from './Creator'
import Expression from './Expression'
import Genre from './Genre'
import Language from './Language'
import Movie from './Movie'
import Platform from './Platform'
import Tags from './Tag'

export default interface Clip {
  id: number,
  title: string,
  slug: string,
  description: string,
  cover: string,
  language: Language,
  genre: Genre,
  tags: Tags[],
  original: string,
  creator: Creator,
  platform: Platform,
  release_year: number,
  movies: Movie[],
  likes_count: number,
  views_count: number,
  like_state: boolean,
  bookmark_state: boolean,
  expressions: Expression[],
}
