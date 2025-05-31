import Tags from "./Tag";

export default interface Expression {
  id: number,
  timeline: string,
  title: string,
  image: string,
  level: string,
  langtags: Tags[],
  word: string,
  explain: string,
}