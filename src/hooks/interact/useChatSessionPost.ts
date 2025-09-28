import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import ChatSession from '@/entities/ChatSession'

const apiClient = new APIClient<ChatSession>('expressions')

const useChatSessionPost = (expressionId: number, action: string) => {
  return useMutation({
    mutationFn: (data: {}) => 
      apiClient.post(expressionId, action, data, {
        withCredentials: true,
      }),
  })
}

export default useChatSessionPost