import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import { FetchResponse } from '@/services/api-store'
import List from '@/entities/List'
import { useAuth } from '@/AuthContext'

const apiClient = new InteractAPIClient<List>('lists')

const useLists = () => {
  const { user } = useAuth()

  return useInfiniteQuery<FetchResponse<List>, Error>({
    queryKey: ['lists'],
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

export default useLists