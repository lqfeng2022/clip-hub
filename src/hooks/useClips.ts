import { useInfiniteQuery } from '@tanstack/react-query'
import APIClient, { FetchResponse } from '../services/api-store'
import useClipQueryStore from '../store'
import Clip from '../entities/Clip'

const apiClient = new APIClient<Clip>('/videos/')

const useClips = () => {
  const clipQuery = useClipQueryStore((s) => s.clipQuery)
  // provide a generic type arg('Error')to handle error message
  // <- useQuery
  return useInfiniteQuery<FetchResponse<Clip>, Error>({
    queryKey: ['videos', clipQuery],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        genre_id: clipQuery.genreId,
        language: clipQuery.languageId,
        ordering: clipQuery.sortOrder,
        search: clipQuery.searchText,
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000 // 24h
  })
}

export default useClips