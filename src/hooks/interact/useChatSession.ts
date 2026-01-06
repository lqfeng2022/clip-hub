import { useQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import ChatSession from '@/entities/ChatSession'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient<ChatSession>('chatsessions')

const useChatSession = (id: string | number) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['chatsessions', id],
    queryFn: () => apiClient.getChatSession(id!),
    enabled: Boolean(user && id), // only run if we have user and id
    retryOnMount: true, // force refetch when navigating back
    refetchOnWindowFocus: false, // avoid unnecessary calls
  })
}

export default useChatSession