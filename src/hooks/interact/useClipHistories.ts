import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import ClipInteract from '@/entities/History'
import FetchResponse from '@/entities/FetchResponse'

const apiClient = new InteractAPIClient<ClipInteract>('histories')

const useClipHistories = () => {
  return useInfiniteQuery<FetchResponse<ClipInteract>, Error>({
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