import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import ClipInteract from '@/entities/History'
import FetchResponse from '@/entities/FetchResponse'
import Epbook from '@/entities/Epbook'

const apiClient = new InteractAPIClient<Epbook>('views')

const useEpHistories = () => {
  return useInfiniteQuery<FetchResponse<Epbook>, Error>({
    queryKey: ['EpHistories'],
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

export default useEpHistories