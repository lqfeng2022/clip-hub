import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import FetchResponse from '@/entities/FetchResponse'
import Search from '@/entities/Search'

const apiClient = new APIClient<Search>('searches')

const useSearches = () => {
    return useInfiniteQuery<FetchResponse<Search>, Error>({
    queryKey: ['searches'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      withCredentials: true,
      params: {
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    retry: false,
  })
}

export default useSearches