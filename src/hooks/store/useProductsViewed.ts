import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import FetchResponse from '@/entities/FetchResponse'
import { Product } from '@/entities/Product'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient<Product>('viewed-products')

const useProductsViewed = () => {
  const { user } = useAuth()
  
  return useInfiniteQuery<FetchResponse<Product>, Error>({
    queryKey: ['viewed-products'],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      withCredentials: true,
      params: {
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000, // 24h
    enabled: !!user,
  })
}

export default useProductsViewed