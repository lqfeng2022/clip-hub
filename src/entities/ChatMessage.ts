export default interface ChatMessage {
  id: number,
  role: 'user' | 'assistant',
  content: string | null,
  audio: string | null, // backend returns URL
  is_voice: boolean,
  audio_seconds: number,
  is_enhancement: boolean,
  created_at: string,
}