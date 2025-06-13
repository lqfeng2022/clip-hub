import Clip from './Clip'
import Tags from './Tag'
import Word from './word'

export default interface Expression {
  id: number,
  timeline: string,
  title: string,
  slug: string,
  image: string,
  language: string,
  langtags: Tags[],
  words: Word[],
  sentence: string,
  explain: string,
  video: Clip,
  bookmark_state: boolean,
}