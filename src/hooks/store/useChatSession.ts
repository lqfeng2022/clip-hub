import { useQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import ChatSession from '@/entities/ChatSession'

const apiClient = new APIClient<ChatSession>('expressions')

const useChatSession = (id: string, enabled: boolean) => 
  useQuery({
    queryKey: ['chatsession', id],
    queryFn: () => apiClient.getChat(id),
    enabled // only runs when true
  })

export default useChatSession