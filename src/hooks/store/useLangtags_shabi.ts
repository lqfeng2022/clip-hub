import { useQuery } from '@tanstack/react-query'
import Tags from '@/entities/Tag'
import APIClient from '@/services/api-store'

const apiClient = new APIClient<Tags>('langtags')

const useGenres = () => useQuery({
  queryKey: ['langtags'],
  queryFn: () => apiClient.getAll(),
  staleTime: 24 * 60 * 60 * 1000, //24h
  // initialData: genres, // copy code from `useGenres.ts`
})

export default useGenres