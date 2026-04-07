import Rewrite from "./Rewrite";

export default interface ChatMessage {
  id: number,
  role: 'user' | 'assistant',
  content: string | null,
  audio: string | null, // backend returns URL
  is_voice: boolean,
  audio_seconds: number,
  is_enhancement: boolean,
  rewrite?: Rewrite,
  created_at: string,
}