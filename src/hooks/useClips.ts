import { Genre } from './useGenres';
import { ClipQuery } from '../App';
import { useInfiniteQuery } from '@tanstack/react-query';
import APIClient, { FetchResponse } from '../services/api-client';

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

const apiClient = new APIClient<Clip>('/videos/')

const useClips = (clipQuery: ClipQuery) => 
  // provide a generic type arg('Error')to handle error message
  // <- useQuery
  useInfiniteQuery<FetchResponse<Clip>, Error>({
    queryKey: ['videos', clipQuery],
    queryFn: ({pageParam = 1}) => apiClient.getAll({
      params: {
        genre_id: clipQuery.genre?.id,
        language: clipQuery.language?.id,
        ordering: clipQuery.sortOrder,
        search: clipQuery.searchText,
        page: pageParam,
      },
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000 // 24h
  });

export default useClips;