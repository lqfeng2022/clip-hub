import Clip from './Clip'
import Tag from './Tag'
import Word from './word'

export default interface Expression {
  id: number,
  timeline: string,
  title: string,
  slug: string,
  image: string,
  language: string,
  langtags: Tag[],
  words: Word[],
  sentence: string,
  explain: string,
  explain_ch: string,
  video: Clip,
  bookmark_state: boolean,
  views_count: number,
  likes_count: number,
}