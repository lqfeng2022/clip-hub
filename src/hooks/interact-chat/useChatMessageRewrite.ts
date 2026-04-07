import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

type RewriteResponse = {
  id: number
  content: string
}

const apiClient = new APIClient<RewriteResponse>('chatsessions')

const useChatMessageRewrite = (chatSessionId: number, messageId: number) => {
  const { user } = useAuth()

  return useMutation<RewriteResponse | undefined>({
    mutationFn: async () => {
      if (!user) return

      return apiClient.rewriteChatMessage(
        chatSessionId, 
        messageId,
        {}, 
        { withCredentials: true }
      )
    },
  })
}

export default useChatMessageRewrite