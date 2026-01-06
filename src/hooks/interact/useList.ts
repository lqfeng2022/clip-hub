import { useQuery } from '@tanstack/react-query'
import APIClient from '../../services/api-interact'
import Collection from '../../entities/Collection'
import { useAuth } from '@/AuthContext'

const apiClient = new APIClient<Collection>('collections')

const useList = (slug: string) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['collections', slug],
    queryFn: () => apiClient.getList(
      slug, 
      { withCredentials: true }
    ),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    enabled: Boolean(user && slug),
  })
}

export default useList