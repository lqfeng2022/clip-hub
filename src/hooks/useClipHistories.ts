import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '../services/api-interact'
import { FetchResponse } from '../services/api-store'
import History from '../entities/History'

const apiClient = new InteractAPIClient<History>('/histories/')

const useClipHistories = () => {
  return useInfiniteQuery<FetchResponse<History>, Error>({
    queryKey: ['clipHistories'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        withCredentials: true,
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000 // 24h
  })
}

export default useClipHistories