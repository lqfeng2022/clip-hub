import Expression from './Expression'

export default interface Epbook {
  id: number,
  expression: Expression,
  visible: boolean,
  timestamp: string
}