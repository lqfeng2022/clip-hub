import useData from "./useData";

export interface Language {
  id: number;
  title: string;
  slug: string;
}

const useLanguages = () => useData<Language>(
  '/languages/'
);

export default useLanguages;