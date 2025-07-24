import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import ListItemTuples from '@/entities/ListItemTuples'

const apiClient = new InteractAPIClient('collections') // main endpoint

const useListItemDelete = () => {
  return useMutation({
    mutationFn: ({ listId, listItemId }: ListItemTuples) => 
      apiClient.deleteListItem(
        listId, listItemId, { withCredentials: true }
      )
  })
}

export default useListItemDelete