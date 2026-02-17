import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import FetchResponse from '@/entities/FetchResponse'
import { useAuth } from '@/AuthContext'
import { Product } from '@/entities/Product'

const apiClient = new APIClient<Product>('playlists')

const usePlaylistProducts = (
  listslug: string,
  options?: { enabled?: boolean }) => {
    const { user } = useAuth()

    return useInfiniteQuery<FetchResponse<Product>, Error>({
      queryKey: ['playlist-products', listslug],
      queryFn: ({pageParam = 1}) => 
        apiClient.getPlaylistProducts(listslug, {
          withCredentials: true,
          params: {
            page: pageParam,
          },
      }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.next ? allPages.length + 1 : undefined
      },
      staleTime: 24 * 60 * 60 * 1000, // 24h
      enabled: Boolean(user && listslug) && (options?.enabled ?? true), // 🔥 important
      retry: 1,
    })
}

export default usePlaylistProducts