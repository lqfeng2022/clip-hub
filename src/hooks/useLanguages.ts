import { useQuery } from '@tanstack/react-query';
import languages from '../data/languages';
import apiClient, { FetchResponse } from '../services/api-client';

export interface Language {
  id: number;
  title: string;
  slug: string;
}

const useLanguages = () => useQuery({
  queryKey: ['languages'],
  queryFn: () => apiClient.get<FetchResponse<Language>>(
    'languages/').then((res) => res.data),
  staleTime: 24 * 60 * 60 * 1000, //24h
  initialData: {count: languages.length, results: languages},
})


export default useLanguages;