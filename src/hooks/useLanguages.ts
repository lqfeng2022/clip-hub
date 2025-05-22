import { useQuery } from '@tanstack/react-query';
import languages from '../data/languages';
import APIClient from '../services/api-client';
import Language from '../entities/Language';

const apiClient = new APIClient<Language>('/languages/')

const useLanguages = () => useQuery({
  queryKey: ['languages'],
  queryFn: () => apiClient.getAll(),
  staleTime: 24 * 60 * 60 * 1000, //24h
  initialData: languages,
})


export default useLanguages;