import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'
import Epbook from '@/entities/Epbook'
import FetchResponse from '@/entities/FetchResponse'

const apiClient = new InteractAPIClient<Epbook>('epbooks')

const useEpbooks = () => {
  const { user } = useAuth()
  return useInfiniteQuery<FetchResponse<Epbook>, Error>({
    queryKey: ['epbooks'],
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
    enabled: !!user,
    retry: false,
  })
}

export default useEpbooks