import { useMutation, useQueryClient } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('saved-playlists')

const useSavedPlaylistDelete = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    // React Query expects mutationFn to take a single argument 
    mutationFn: async ({ listId }: { listId: number }) => {
      if (!user) return 
      return apiClient.delete(
        listId, { withCredentials: true }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-playlists']})
    }
  })
}

export default useSavedPlaylistDelete