import Clip from './Clip'
import { Subtitle } from './Subtitle'
import Tag from './Tag'

export default interface Expression {
  id: number,
  title: string,
  slug: string,
  image: string,
  language: string,
  langtags: Tag[],
  explain: string,
  explain_ch: string,
  video: Clip,
  subtitle: Subtitle,
  like_state: boolean,
  views_count: number,
  likes_count: number,
}