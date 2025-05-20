import languages from '../data/languages';
// import useData from './useData';

export interface Language {
  id: number;
  title: string;
  slug: string;
}

// const useLanguages = () => useData<Language>('/languages/');
const useLanguages = () => (
  { data: languages, error: null }
);


export default useLanguages;