import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '../services/api-interact'
import { FetchResponse } from '../services/api-store'
import Search from '../entities/Search'
import { useAuth } from '../AuthContext'

const apiClient = new InteractAPIClient<Search>('/searches/')

const useSearches = () => {
  const { user } = useAuth()
  return useInfiniteQuery<FetchResponse<Search>, Error>({
    queryKey: ['searches'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        withCredentials: true,
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    enabled: !!user,
    retry: false,
  })
}

export default useSearches