import { Creator } from './Creator'
import Expression from './Expression'
import Genre from './Genre'
import { Subtitle } from './Subtitle'
import Tag from './Tag'

export default interface Clip {
  id: number,
  title: string,
  title_ch?: string,
  slug: string,
  description: string,
  description_ch?: string,
  cover: string,
  genre: Genre,
  tags: Tag[],
  original: string,
  original_ch?: string,
  creator: Creator,
  release_year: number,
  kind: 'SHORT' | 'NORMAL',
  file: string,
  website: string,
  likes_count: number,
  views_count: number,
  expressions: Expression[],
  subtitles: Subtitle[],
}
