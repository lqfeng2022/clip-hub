import ChatMessage from './ChatMessage'
import Host from './Host'
import { Product } from './Product'

export default interface ChatSession {
  id: number,
  messages_count: number,
  credits_used: number,
  user_audio_seconds: number,
  assistant_audio_seconds: number,
  call_audio_seconds: number,
  total_duration: number,
  summary: string,
  latest_chat: string,
  created_at: string,
  updated_at: string,
  host: Host,
  product: Product,
  messages?: ChatMessage[],
}