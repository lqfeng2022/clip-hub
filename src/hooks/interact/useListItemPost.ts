import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'

const apiClient = new InteractAPIClient('lists')

const useListItemPost = () => {
  return useMutation({
    // async-await: 
    //  cus wa're handling a multiple posts, 
    //  wait for all to finished before resolving the mutation..
    mutationFn: async (
      { video_id, listIds }: { video_id: number, listIds: number[] }
    ) => {
      // `allSettled()`: partial success handling
      const responses = await Promise.allSettled(
        listIds.map((listId) =>
          apiClient.postListItem(listId, { video_id }, {
            withCredentials: true,
          })
        )
      )
      // an array of response values from each call
      return responses 
    },
  })
}

export default useListItemPost