import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import FetchResponse from '@/entities/FetchResponse'
import { useAuth } from '@/AuthContext'
import ChatList from '@/entities/ChatList'

const apiClient = new InteractAPIClient<ChatList>('chatsessions')

const useChats = () => {
  const { user } = useAuth()

  return useInfiniteQuery<FetchResponse<ChatList>, Error>({
    queryKey: ['chatsessions'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        withCredentials: true,
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

export default useChats