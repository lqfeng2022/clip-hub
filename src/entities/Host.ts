import Video from './Video'
import Expression from './Expression'
import Subtitle from './Subtitle'

export default interface Host {
  id: number,
  name: string,
  slug: string,
  portrait: string,
  cover: string,
  videos_count: number,
  subtitles_count: number,
  expressions_count: number,
  total_content: number,
  videos?: Video[],
  subtitles?: Subtitle[],
  expressions?: Expression[]
  followed: boolean,
  created_at: string,
  updated_at: string,
}