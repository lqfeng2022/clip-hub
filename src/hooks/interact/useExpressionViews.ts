import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import FetchResponse from '@/entities/FetchResponse'
import ExpressionLike from '@/entities/ExpressionLike'

const apiClient = new InteractAPIClient<ExpressionLike>('views')

const useExpressionViews = () => {
  return useInfiniteQuery<FetchResponse<ExpressionLike>, Error>({
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

export default useExpressionViews