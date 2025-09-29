import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'

const apiClient = new InteractAPIClient('chatsessions') // main endpoint

const useChatSessionDelete = () => {
  return useMutation({
    // React Query expects mutationFn to take a single argument 
    mutationFn: ({ sessionId }: { sessionId: number }) => 
      apiClient.delete(sessionId, { withCredentials: true })
  })
}

export default useChatSessionDelete