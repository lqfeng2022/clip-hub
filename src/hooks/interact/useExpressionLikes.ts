import { useInfiniteQuery } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'
import ExpressionLike from '@/entities/ExpressionLike'
import FetchResponse from '@/entities/FetchResponse'

const apiClient = new InteractAPIClient<ExpressionLike>('eplikes')

const useExpressionLikes = () => {
  const { user } = useAuth()
  return useInfiniteQuery<FetchResponse<ExpressionLike>, Error>({
    queryKey: ['eplikes'],
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

export default useExpressionLikes