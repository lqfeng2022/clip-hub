import { useQuery } from '@tanstack/react-query';
import apiClient, { FetchResponse } from '../services/api-client';
import genres from '../data/genres';

export interface Genre {
  id: number;
  title: string;
  image: string;
}

const useGenres = () => useQuery({
  queryKey: ['genres'],
  queryFn: () => 
    apiClient.get<FetchResponse<Genre>>(
      '/genres/').then((res) => res.data),
  // for better performance:
  // 1. genre list, there is no need to change it frequently
  staleTime: 24 * 60 * 60 * 1000, //24h
  // 2. provide initial data
  initialData: {count: genres.length, results: genres},
});

export default useGenres;