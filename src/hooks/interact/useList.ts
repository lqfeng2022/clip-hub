import { useQuery } from '@tanstack/react-query'
import InteractAPIClient from '../../services/api-interact'
import List from '../../entities/List'

const apiClient = new InteractAPIClient<List>('collections')

const useList = (slug: string) => 
  useQuery({
    queryKey: ['list', slug],
    queryFn: () => apiClient.get(
      slug, { withCredentials: true }
    ),
  })

export default useList