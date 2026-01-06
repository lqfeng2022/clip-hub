import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import FetchResponse from '@/entities/FetchResponse'
import { Product } from '@/entities/Product'
import useProductFilterStore from '@/stores/productFilterStore'

const apiClient = new APIClient<Product>('products')

const useSearchProducts = () => {
  const query = useProductFilterStore(s => s.query)

  return useInfiniteQuery<FetchResponse<Product>, Error>({
    queryKey: ['search-products', query],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          host: query.hostId ?? undefined,
          type: query.type ?? undefined,
          search: query.searchText || undefined,
          sort: query.sortOrder || undefined,
          page: pageParam
        }
      }),
    getNextPageParam: (last, all) => (
      last.next ? all.length + 1 : undefined
    ),
    staleTime: 1000 * 60 * 60 * 24,
  })
}

export default useSearchProducts