import { useMutation, useQueryClient } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('collections') // main endpoint

const useListUpdate = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ listId, title }: { listId: number, title: string }) => {
      if (!user) return
      return apiClient.put(
        listId, { title }, { withCredentials: true }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections']})
    }
  })
}

export default useListUpdate