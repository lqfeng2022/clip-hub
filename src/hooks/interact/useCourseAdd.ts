import { useMutation } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('saved-courses')

const useCourseAdd = () => {
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (data: { course: string }) => {
      if (!user) return
      return apiClient.post(data, {
        withCredentials: true,
      })
    }
  })
}

export default useCourseAdd