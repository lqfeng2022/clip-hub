import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('saved-playlists')

const usePlaylistAdd = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (data: { playlist: string }) => {
      if (!user) return
      return apiClient.post(data, {
        withCredentials: true,
      })
    }
  })
}

export default usePlaylistAdd