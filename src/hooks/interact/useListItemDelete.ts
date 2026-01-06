import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import CollectionItemTuple from '@/entities/CollectionItemTuple'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('collections')

const useListItemDelete = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async({ listId, listItemId }: CollectionItemTuple) => {
      if (!user) return
      return apiClient.deleteListItem(
        listId, 
        listItemId, 
        { withCredentials: true }
      )
    }
  })
}

export default useListItemDelete