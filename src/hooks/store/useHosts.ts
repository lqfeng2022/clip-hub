import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import FetchResponse from '@/entities/FetchResponse'
import Host from '@/entities/Host'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient<Host>('hosts')

const useHosts = () => {
  const { user } = useAuth()
  
  return useInfiniteQuery<FetchResponse<Host>, Error>({
    queryKey: ['hosts'],
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
  })
}

export default useHosts