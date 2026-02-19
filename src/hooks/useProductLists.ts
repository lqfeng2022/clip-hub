import { useQuery } from '@tanstack/react-query'
import APIClient from '../services/api-interact'
import Collection from '../entities/Collection'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient<Collection[]>('collections')

const useProductLists = (productId: string) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['product-collections', productId],
    queryFn: () => apiClient.getProductLists(
      productId, 
      { withCredentials: true }
    ),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    enabled: Boolean(user && productId),
  })
}

export default useProductLists