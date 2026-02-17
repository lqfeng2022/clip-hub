import { useQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import Playlist from '@/entities/Playlist'

const apiClient = new APIClient<Playlist>('playlists')

const usePlaylist = (slug: string) => 
  useQuery({
    queryKey: ['playlist', slug],
    queryFn: () => apiClient.get(slug),
  })

export default usePlaylist