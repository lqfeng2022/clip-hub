import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '../services/api-interact'
import { FetchResponse } from '../services/api-store'
import ClipInteract from '../entities/History'

const apiClient = new InteractAPIClient<ClipInteract>('/likes/')

const useClipLikes = () => {
  return useInfiniteQuery<FetchResponse<ClipInteract>, Error>({
    queryKey: ['clipLikes'],
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

export default useClipLikes