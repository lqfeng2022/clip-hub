import { useMutation, useQueryClient } from '@tanstack/react-query'
import ChatMessage from '@/entities/ChatMessage'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

type Payload =
  | { type: 'text', content: string, is_voice: boolean, is_enhancement: boolean }
  | { type: 'audio', audio: Blob, is_voice: boolean, is_enhancement: boolean }

const apiClient = new APIClient<ChatMessage>('chatsessions')

const useChatMessagePost = (chatSessionId: number) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Payload) => {
      if (!user) return

      // TEXT MESSAGE
      if (data.type === 'text') {
        return apiClient.postChatMessage(
          chatSessionId, 
          { content: data.content, is_voice: data.is_voice, is_enhancement: data.is_enhancement }, 
          { withCredentials: true }
        )
      }

      // AUDIO MESSAGE
      const formData = new FormData()
      formData.append('audio', data.audio, `voice-${Date.now()}.webm`)
      formData.append('is_voice', String(data.is_voice))
      formData.append('is_enhancement', String(data.is_enhancement))
      
      return apiClient.postChatMessage(
        chatSessionId,
        formData,
        { withCredentials: true }
      )
    },
    onSuccess: () => {
      // Refetch the chat session to get the new message/audio
      queryClient.invalidateQueries({ 
        queryKey: ['chatsessions', chatSessionId] 
      })
    }
  })
}

export default useChatMessagePost