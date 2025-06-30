import { useQuery } from '@tanstack/react-query'
import Langtag from '@/entities/Langtag'
import APIClient from '@/services/api-store'

const apiClient = new APIClient<Langtag>('langtags')

const useLangtags = () => useQuery({
  queryKey: ['langtags'],
  queryFn: () => apiClient.getAll(),
  staleTime: 24 * 60 * 60 * 1000, //24h
})

export default useLangtags