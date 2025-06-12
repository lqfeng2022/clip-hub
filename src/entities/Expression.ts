import Clip from './Clip'
import Tags from './Tag'

export default interface Expression {
  id: number,
  timeline: string,
  title: string,
  slug: string,
  image: string,
  level: string,
  language: string,
  langtags: Tags[],
  sentence: string,
  explain: string,
  video: Clip,
  bookmark_state: boolean,
}