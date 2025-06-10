import { useQuery } from '@tanstack/react-query'
import APIClient from '../../services/api-store'
import Expression from '../../entities/Expression'

const apiClient = new APIClient<Expression>('expressions')

const useExpression = (slug: string) => 
  useQuery({
    queryKey: ['expressions', slug],
    queryFn: () => apiClient.get(slug),
  })

export default useExpression