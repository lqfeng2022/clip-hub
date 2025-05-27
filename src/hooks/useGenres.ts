import { useQuery } from '@tanstack/react-query'
import genres from '../data/genres'
import APIClient from '../services/api-store'
import Genre from '../entities/Genre'

const apiClient = new APIClient<Genre>('/genres/')

const useGenres = () => useQuery({
  // `queryKey`: a unique identifier for a specific query in React Query,
  // of course, we can use other name, but 'genres' is the best practice
  queryKey: ['genres'],
  queryFn: () => apiClient.getAll(),
  staleTime: 24 * 60 * 60 * 1000, //24h
  initialData: genres,
})

export default useGenres