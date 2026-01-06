import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import ChatSession from '@/entities/ChatSession'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient<ChatSession>('products')

const useChatSessionPost = (productId: number, action: string) => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (data: {}) => {
      if (!user) return
      return apiClient.post(
        productId, 
        action, 
        data, 
        { withCredentials: true }
      )
    }
  })
}

export default useChatSessionPost