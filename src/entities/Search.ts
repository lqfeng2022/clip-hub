export default interface Search {
  id: number,
  content: boolean,
  visible: boolean,
  timestamp: string,
  kind: 'CLIP' | 'WORDS'
}