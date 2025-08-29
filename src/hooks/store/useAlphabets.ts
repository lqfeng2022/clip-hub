import { useQuery } from '@tanstack/react-query'
import APIClient from '@/services/api-store'
import Alphabet from '@/entities/Alphabet'

const apiClient = new APIClient<Alphabet>('alphabets/')

const useAlphabets = () => useQuery({
  queryKey: ['alphabets'],
  queryFn: () => apiClient.getAll(),
  staleTime: 24 * 60 * 60 * 1000, //24h
})

export default useAlphabets