export default interface Search {
  id: number,
  content: string,
  visible: boolean,
  timestamp: string,
  kind: 'CLIP' | 'WORDS'
}