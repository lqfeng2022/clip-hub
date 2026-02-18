import { useQuery } from '@tanstack/react-query'
import APIClient from '../../services/api-store'
import { useAuth } from '@/AuthContext'
import Course from '@/entities/Course'

const apiClient = new APIClient<Course>('courses')

const useCourse = (slug: string) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['courses', slug],
    queryFn: () => apiClient.getCourse(
      slug, 
      { withCredentials: true }
    ),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    enabled: Boolean(user && slug),
  })
}

export default useCourse