import { Genre } from './useGenres';
import { ClipQuery } from '../App';
import { useQuery } from '@tanstack/react-query';
import apiClient, { FetchResponse } from '../services/api-client';

export interface Tags {
  id: number;
  title: string;
  slug: string;
}

export interface Clip {
  id: number;
  title: string;
  cover: string;
  genre: Genre;
  tags: Tags[];
}

const useClips = (clipQuery: ClipQuery) => 
  // provide a generic type arg('Error')to handle error message
  useQuery<FetchResponse<Clip>, Error>({
    queryKey: ['videos', clipQuery],
    queryFn: () => apiClient.get<FetchResponse<Clip>>(
      '/videos/', { params: {
        genre_id: clipQuery.genre?.id,
        language: clipQuery.language?.id,
        ordering: clipQuery.sortOrder,
        search: clipQuery.searchText,}
      }).then((res) => res.data),
});

export default useClips;