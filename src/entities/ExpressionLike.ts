import Expression from './Expression'

export default interface ExpressionLike {
  id: number,
  expression: Expression,
  visible: boolean,
  timestamp: string
}