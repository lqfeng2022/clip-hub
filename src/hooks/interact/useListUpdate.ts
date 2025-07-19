import { useMutation } from '@tanstack/react-query'
import InteractAPIClient from '@/services/api-interact'

const apiClient = new InteractAPIClient('collections') // main endpoint

interface UpdatePayload {
  listId: number,
  title: string,
}
const useListUpdate = () => {
  return useMutation({
    mutationFn: ({ listId, title }: UpdatePayload) => 
      apiClient.putList(
        listId, { title }, { withCredentials: true }
      )
  })
}

export default useListUpdate