import { create } from 'zustand'

interface ClipQuery {
  // 2.1)SOLUTION: make these properties are optional too (undefined)
  genreId?: number,
  sortOrder?: string,
  searchText?: string,
}

interface ClipQueryStore {
  clipQuery: ClipQuery,
  // 1)WHY we don't have a single f like 'setClipQuery'??
  //   cus logic for updating 'searchText' is different from other props
  setSearchText: (searchText: string) => void,
  setGenreId: (genreId: number | undefined) => void,
  setSortOrder: (sortOrder: string) => void,
}

const useClipQueryStore = create<ClipQueryStore>((set) => ({
  // 2)ISSEU: 
  // Type '{}' is missing the following properties from type 'ClipQuery': sortOrder, searchTexts(2739)
  clipQuery: {},
  
  // 3)when search a clip, we should only set the searchText and clear other filters,
  //   cus what if we don’t clear other filters like genre, the user may select the wrong genre..
  setSearchText: (searchText) => set(
    () => ({ clipQuery: { searchText } })
  ),
  setGenreId: (genreId) => set(
    (store) => ({ clipQuery: { ...store.clipQuery, genreId }})
  ),
  setSortOrder: (sortOrder) => set(
    (store) => ({ clipQuery: { ...store.clipQuery, sortOrder } })
  ),
}))

export default useClipQueryStore