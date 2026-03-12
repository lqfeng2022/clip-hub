import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('collections')

interface Props {
  listId: number
  listItemId: number 
}

const useListItemDelete = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async({ listId, listItemId }: Props) => {
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