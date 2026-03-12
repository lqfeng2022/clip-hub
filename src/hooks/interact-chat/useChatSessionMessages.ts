import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import FetchResponse from '@/entities/FetchResponse'
import { useAuth } from '@/AuthContext'
import ChatMessage from '@/entities/ChatMessage'

const apiClient = new APIClient<ChatMessage>('chatsessions')

const useChatSessionMessages = (
  chatId: number | string,
  options?: { enabled?: boolean }) => {
    const { user } = useAuth()

    return useInfiniteQuery<FetchResponse<ChatMessage>, Error>({
      queryKey: ['chatsession-messages', chatId],
      queryFn: ({pageParam = 1}) => 
        apiClient.getChatMessages(chatId, {
          withCredentials: true,
          params: {
            page: pageParam,
          },
      }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.next ? allPages.length + 1 : undefined
      },
      staleTime: 24 * 60 * 60 * 1000, // 24h
      enabled: Boolean(user && chatId) && (options?.enabled ?? true), // 🔥 important
      retry: 1,
    })
}

export default useChatSessionMessages