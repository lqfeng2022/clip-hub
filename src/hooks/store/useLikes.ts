import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import { useAuth } from '@/AuthContext'
import FetchResponse from '@/entities/FetchResponse'
import { Product } from '@/entities/Product'

const apiClient = new APIClient<Product>('liked-products')

const useLikes = () => {
  const { user } = useAuth()
  
  return useInfiniteQuery<FetchResponse<Product>, Error>({
    queryKey: ['liked-products'],
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
    retry: false,
  })
}

export default useLikes