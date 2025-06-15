import { useQuery } from '@tanstack/react-query'
import Tag from '@/entities/Tag'
import APIClient from '@/services/api-store'

const apiClient = new APIClient<Tag>('langtags')

const useLangtags = () => useQuery({
  queryKey: ['langtags'],
  queryFn: () => apiClient.getAll(),
  staleTime: 24 * 60 * 60 * 1000, //24h
})

export default useLangtags