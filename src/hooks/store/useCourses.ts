import { useInfiniteQuery } from '@tanstack/react-query'
import FetchResponse from '@/entities/FetchResponse'
import APIClient from '@/services/api-store'
import usePlaylistQueryStore from '@/stores/playlistStore'
import Course from '@/entities/Course'

const apiClient = new APIClient<Course>('courses')

const useCourses = () => {
  const courseQuery = usePlaylistQueryStore(
    (s) => s.playlistQuery)

  return useInfiniteQuery<FetchResponse<Course>, Error>({
    queryKey: ['courses', courseQuery],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        host: courseQuery.hostId,
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined
    },
    staleTime: 24 * 60 * 60 * 1000 // 24h
  })
}

export default useCourses