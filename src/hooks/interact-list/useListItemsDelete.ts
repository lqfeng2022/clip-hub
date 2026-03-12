import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('collections')

interface Props {
  product_id: number
  listIds: number[]
}

const useListItemsDelete = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async ({ product_id, listIds }: Props) => {
      if (!user) return

      // Backend accepts bulk deletion by product_id + listIds
      return apiClient.deleteListItemsBulk(
        { product_id, listIds }, 
        { withCredentials: true }
      )
    }
  })
}

export default useListItemsDelete