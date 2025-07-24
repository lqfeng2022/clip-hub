import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import ListItemTuples from '@/entities/ListItemTuples'

const apiClient = new InteractAPIClient('collections')

const useListItemMultDelete = () => {
  return useMutation({
    mutationFn: async (listItemTuples: ListItemTuples[]) => {
      const responses = await Promise.allSettled(
        listItemTuples.map(({ listId, listItemId }) =>
          apiClient.deleteListItem(
            listId, 
            listItemId, 
            { withCredentials: true }
          )
        )
      )
      return responses
    }
  })
}

export default useListItemMultDelete