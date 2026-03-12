import { useInfiniteQuery } from '@tanstack/react-query'
import FetchResponse from '@/entities/FetchResponse'
import APIClient from '@/services/api-interact'
import SavedCourse from '@/entities/SavedCourse'
import useCourseQueryStore from '@/stores/courseStore'

const apiClient = new APIClient<SavedCourse>('saved-courses')

const useSavedCourses = () => {
  const CourseQuery = useCourseQueryStore(
    (s) => s.courseQuery)

  return useInfiniteQuery<FetchResponse<SavedCourse>, Error>({
    queryKey: ['saved-courses', CourseQuery],
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

export default useSavedCourses