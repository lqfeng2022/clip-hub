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
  word: string,
  explain: string,
  video: string,
  bookmark_state: boolean,
}