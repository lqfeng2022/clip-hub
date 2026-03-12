import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import FetchResponse from '@/entities/FetchResponse'
import { useAuth } from '@/AuthContext'
import { Product } from '@/entities/Product'

const apiClient = new APIClient<Product>('collections')

const useListProducts = (
  listId: number | string,
  options?: { enabled?: boolean }) => {
    const { user } = useAuth()

    return useInfiniteQuery<FetchResponse<Product>, Error>({
      queryKey: ['list-products', listId],
      queryFn: ({pageParam = 1}) => 
        apiClient.getListProducts(listId, {
          withCredentials: true,
          params: {
            page: pageParam,
          },
      }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.next ? allPages.length + 1 : undefined
      },
      staleTime: 24 * 60 * 60 * 1000, // 24h
      enabled: Boolean(user && listId) && (options?.enabled ?? true), // 🔥 important
      retry: 1,
    })
}

export default useListProducts