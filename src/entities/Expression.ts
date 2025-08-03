import Clip from './Clip'
import Langtag from './Langtag'
import { Subtitle } from './Subtitle'

export default interface Expression {
  id: number,
  title: string,
  slug: string,
  image: string,
  language: string,
  langtags: Langtag[],
  explain: string,
  explain_ch: string,
  video: Clip,
  subtitle: Subtitle,
  like_state: boolean,
  views_count: number,
  likes_count: number,
}