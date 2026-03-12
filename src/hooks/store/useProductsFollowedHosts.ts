import { useInfiniteQuery } from '@tanstack/react-query'
import useProductQueryStore from '@/stores/productStore'
import FetchResponse from '@/entities/FetchResponse'
import { Product } from '@/entities/Product'
import APIClient from '@/services/api-store'

const apiClient = new APIClient<Product>('followed-products')

const useProductsFollowedHosts = () => {
  const productQuery = useProductQueryStore(
    (s) => s.productQuery)

  return useInfiniteQuery<FetchResponse<Product>, Error>({
    queryKey: ['followed-products', productQuery],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        search: productQuery.searchText,
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000 // 24h
  })
}

export default useProductsFollowedHosts