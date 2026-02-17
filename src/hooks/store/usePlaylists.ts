import { useInfiniteQuery } from '@tanstack/react-query'
import FetchResponse from '@/entities/FetchResponse'
import APIClient from '@/services/api-store'
import Playlist from '@/entities/Playlist'
import usePlaylistQueryStore from '@/stores/playlistStore'

const apiClient = new APIClient<Playlist>('playlists')

const usePlaylists = () => {
  const playlistQuery = usePlaylistQueryStore(
    (s) => s.productQuery)

  return useInfiniteQuery<FetchResponse<Playlist>, Error>({
    queryKey: ['playlists', playlistQuery],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        host: playlistQuery.hostId,
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000 // 24h
  })
}

export default usePlaylists