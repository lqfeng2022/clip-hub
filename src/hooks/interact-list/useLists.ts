import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import FetchResponse from '@/entities/FetchResponse'
import Collection from '@/entities/Collection'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient<Collection>('collections')

const useLists = () => {
  const { user } = useAuth()

  return useInfiniteQuery<FetchResponse<Collection>, Error>({
    queryKey: ['collections'],
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

export default useLists