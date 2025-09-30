import ChatMessage from './ChatMessage'

export default interface ChatSession {
  id: number,
  user: number,
  expression: number,
  messages: ChatMessage[],
  created_at: string,
}