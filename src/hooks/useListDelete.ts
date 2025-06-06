import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '../services/api-interact'

const apiClient = new InteractAPIClient('lists') // main endpoint

const useListDelete = () => {
  return useMutation({
    // React Query expects mutationFn to take a single argument 
    mutationFn: ({ listId }: { listId: number }) => 
      apiClient.deleteList(listId, { withCredentials: true })
  })
}

export default useListDelete