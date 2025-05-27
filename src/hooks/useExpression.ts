import { useQuery } from '@tanstack/react-query'
import APIClient from '../services/api-store'
import Expression from '../entities/Expression'

const useExpression = (clipId: number) => {
  const apiClient = new APIClient<Expression>(`/videos/${clipId}/expression/`)

  return useQuery({
    queryKey: ['expression', clipId],
    queryFn: () => apiClient.getAll(),
  })
}

export default useExpression