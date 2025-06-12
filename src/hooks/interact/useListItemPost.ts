import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'

const apiClient = new InteractAPIClient('lists')

interface Props {
  video_id: number, 
  listIds: number[]
}
const useListItemPost = () => {
  return useMutation({
    mutationFn: async ({ video_id, listIds }: Props) => {
      const responses = await Promise.allSettled(
        listIds.map((listId) => apiClient.postListItem(
          listId, 
          { video_id }, 
          { withCredentials: true }
        ))
      )
      return responses 
    }
  })
}

export default useListItemPost


// CODE Explaining //
// 1)async-await: 
//   to handle a multiple posts, 
//   wait for all to finished before resolving the mutation..
// 2)`allSettled()`: partial success handling
// 3) `return responses`: an array of response values from each call