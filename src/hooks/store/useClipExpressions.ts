import { useQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import Expression from '@/entities/Expression'

// clipId -> clipId?, cus it might be undefined
const useClipExpressions = (clipId?: number) => {
  const apiClient = new APIClient<Expression>(`videos/${clipId}/expressions/`)

  return useQuery({
    queryKey: ['expressions', clipId],
    queryFn: () => apiClient.getAll(),
    // and enable it only when clipId is truthy, 
    // prevent the request from being fired until clipId exists
    enabled: !!clipId,
  })
}

export default useClipExpressions