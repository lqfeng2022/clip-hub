import { useInfiniteQuery } from '@tanstack/react-query'
import Epbook from '../entities/Epbook'
import InteractAPIClient from '../services/api-interact'
import { FetchResponse } from '../services/api-store'

const apiClient = new InteractAPIClient<Epbook>('/epbooks/')

const useEpbooks = () => {
  return useInfiniteQuery<FetchResponse<Epbook>, Error>({
    queryFn: ({pageParam = 1}) => apiClient.getEpbook({
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

export default useEpbooks