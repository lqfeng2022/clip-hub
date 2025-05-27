import { useQuery } from '@tanstack/react-query'
import APIClient from '../services/api-store'
import Clip from '../entities/Clip'

const apiClient = new APIClient<Clip>('videos')

const useClip = (slug: string) => 
  useQuery({
    queryKey: ['videos', slug],
    queryFn: () => apiClient.get(slug),
  })

export default useClip