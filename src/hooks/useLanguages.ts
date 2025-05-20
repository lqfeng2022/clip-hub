import { useQuery } from '@tanstack/react-query';
import languages from '../data/languages';
import APIClient from '../services/api-client';

export interface Language {
  id: number;
  title: string;
  slug: string;
}
const apiClient = new APIClient<Language>('/languages/')

const useLanguages = () => useQuery({
  queryKey: ['languages'],
  queryFn: () => apiClient.getAll(),
  staleTime: 24 * 60 * 60 * 1000, //24h
  initialData: {count: languages.length, results: languages},
})


export default useLanguages;