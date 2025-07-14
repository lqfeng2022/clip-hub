import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import useExpressionQueryStore from '@/expressionStore'
import Expression from '@/entities/Expression'
import FetchResponse from '@/entities/FetchResponse'

const apiClient = new APIClient<Expression>('expressions/')

const useExpressions = () => {
  const expressionQuery = useExpressionQueryStore(
    (s) => s.expressionQuery)

  return useInfiniteQuery<FetchResponse<Expression>, Error>({
    queryKey: ['expressions', expressionQuery], // issues fixed: <- 'videos'
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        langtags__id: expressionQuery.tagId,
        formal: expressionQuery.formal,
        ordering: expressionQuery.sortOrder,
        search: expressionQuery.searchText,
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000 // 24h
  })
}

export default useExpressions