import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import FetchResponse from '@/entities/FetchResponse'
import { useAuth } from '@/AuthContext'
import ChatSession from '@/entities/ChatSession'

const apiClient = new APIClient<ChatSession>('chatsessions')

const useChatSessions = () => {
  const { user } = useAuth()

  return useInfiniteQuery<FetchResponse<ChatSession>, Error>({
    queryKey: ['chatsessions'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      withCredentials: true,
      params: {
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000, // 24h
    enabled: !!user, // prevents fetch when user is null
    retry: 1,
  })
}

export default useChatSessions