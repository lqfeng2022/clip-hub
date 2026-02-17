import { useInfiniteQuery } from '@tanstack/react-query'
import FetchResponse from '@/entities/FetchResponse'
import APIClient from '@/services/api-interact'
import usePlaylistQueryStore from '@/stores/playlistStore'
import SavedPlaylist from '@/entities/SavedPlaylist'

const apiClient = new APIClient<SavedPlaylist>('saved-playlists')

const useSavedPlaylists = () => {
  const playlistQuery = usePlaylistQueryStore(
    (s) => s.productQuery)

  return useInfiniteQuery<FetchResponse<SavedPlaylist>, Error>({
    queryKey: ['saved-playlists', playlistQuery],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000 // 24h
  })
}

export default useSavedPlaylists