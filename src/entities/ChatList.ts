import Expression from './Expression'

export default interface ChatList {
  id: number,
  user: number,
  expression: Expression,
  messages_count: number,
  created_at: string,
}