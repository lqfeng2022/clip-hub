import { useMutation } from '@tanstack/react-query'
import ChatMessage from '@/entities/ChatMessage'
import InteractAPIClient from '@/services/api-interact'

const apiClient = new InteractAPIClient<ChatMessage>('chatsessions')

const useChatMessagePost = (chatSessionId: number) => {
  return useMutation({
    mutationFn: (data: { content: string }) => 
      apiClient.postChatMessage(chatSessionId, data, {
        withCredentials: true,
      }),
  })
}

export default useChatMessagePost