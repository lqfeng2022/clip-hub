import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('chatsessions') // main endpoint

const useChatSessionDelete = () => {
  const { user } = useAuth()
  
  return useMutation({
    // React Query expects mutationFn to take a single argument 
    mutationFn: async ({ sessionId }: { sessionId: number }) => {
      if (!user) return
      return apiClient.delete(
        sessionId, 
        { withCredentials: true }
      )
    }
  })
}

export default useChatSessionDelete