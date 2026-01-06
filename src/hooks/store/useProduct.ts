import { useQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import { Product } from '@/entities/Product'

const apiClient = new APIClient<Product>('products')

const useProduct = (id: string) => 
  useQuery({
    queryKey: ['products', id],
    queryFn: () => apiClient.get(id),
  })

export default useProduct