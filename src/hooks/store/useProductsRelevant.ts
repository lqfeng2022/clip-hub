import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import FetchResponse from '@/entities/FetchResponse'
import { Product } from '@/entities/Product'

const apiClient = new APIClient<Product>('products')

const useProductsRelevant = (id: string) => {
  return useInfiniteQuery<FetchResponse<Product>, Error>({
    queryKey: ['relevants', id],
    queryFn: ({pageParam = 1}) => apiClient.getRelevant(id, {
      params: {
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000, // 24h
    enabled: !!id, // avoid undefined id
    keepPreviousData: true, // optional for smoother UX
  })
}

export default useProductsRelevant