import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import { Product } from '@/entities/Product'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient<Product>('products')

const useInteractPost = (productId: number, action: string) => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (data: { visible: boolean }) => {
      if (!user) return // <- STOP anonymous users
      return apiClient.post(
        productId, 
        action, 
        data, 
        { withCredentials: true}
      )
    }
  })
}

export default useInteractPost