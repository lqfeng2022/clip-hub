import useData from './useData';

export interface Genre {
  id: number;
  title: string;
}

const useGenres = () => useData<Genre>('/genres/')

export default useGenres;