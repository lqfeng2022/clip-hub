import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('collections')

const useListItemPost = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async ({ product_id, listIds }: { 
      product_id: number, listIds: number[] 
    }) => {
      if (!user) return
      const responses = await Promise.allSettled(
        listIds.map((listId) => apiClient.postListItem(
          listId, 
          { product_id }, 
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