import { useQuery } from '@tanstack/react-query'
import List from '../entities/List'
import InteractAPIClient from '../services/api-interact'

const apiClient = new InteractAPIClient<List>('lists')

const useList = (slug: string) => 
  useQuery({
    queryKey: ['lists', slug],
    queryFn: () => apiClient.get(
      slug, { withCredentials: true }
    ),
  })

export default useList