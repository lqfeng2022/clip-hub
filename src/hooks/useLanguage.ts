import useLanguages from './useLanguages'

const useLanguage = (id?: number) => {
  const {data: languages} = useLanguages()
  return languages?.results.find((l) => l.id == id)
}

export default useLanguage