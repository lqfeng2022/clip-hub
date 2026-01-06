import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'
import CollectionItemTuple from '@/entities/CollectionItemTuple'
import { useAuth } from '@/AuthContext'

const apiClient = new InteractAPIClient('collections')

const useListItemMultDelete = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (listItemTuples: CollectionItemTuple[]) => {
      if (!user) return
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