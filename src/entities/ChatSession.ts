import ChatMessage from './ChatMessage'
import Host from './Host'
import { Product } from './Product'

export default interface ChatSession {
  id: number,
  messages_count: number,
  summary: string,
  latest_chat: string,
  created_at: string,
  updated_at: string,
  host: Host,
  product: Product,
  messages?: ChatMessage[],
}