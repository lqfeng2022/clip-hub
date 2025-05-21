import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/api-client';
import { Clip } from './useClips';

const apiClient = new APIClient<Clip>('videos');

const useClip = (slug: string) => 
  useQuery({
    queryKey: ['videos', slug],
    queryFn: () => apiClient.get(slug),
  });

export default useClip