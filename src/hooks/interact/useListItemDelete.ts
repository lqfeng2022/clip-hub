import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'

const apiClient = new InteractAPIClient('lists') // main endpoint

const useListItemDelete = () => {
  return useMutation({
    mutationFn: (
      { listId, listItemId }: { listId: number, listItemId: number }
    ) => 
      apiClient.deleteListItem(
        listId, listItemId, { withCredentials: true }
      )
  })
}

export default useListItemDelete