import { useMutation, useQueryClient } from '@tanstack/react-query'
import APIClient from '@/services/api-interact'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient('saved-courses')

const useSavedCourseDelete = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ listId: courseId }: { listId: number }) => {
      if (!user) return 
      return apiClient.delete(
        courseId, { withCredentials: true }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-courses']})
    }
  })
}

export default useSavedCourseDelete