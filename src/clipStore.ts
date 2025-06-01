import { create } from 'zustand'

interface ClipQuery {
  genreId?: number,
  // 2.1)SOLUTION: make these properties are optional too (undefined)
  languageId?: number,
  sortOrder?: string,
  searchText?: string,
}

interface ClipQueryStore {
  clipQuery: ClipQuery,
  // 1)WHY we don't have a single f like 'setClipQuery'??
  //   cus logic for updating 'searchText' is different from other props
  setSearchText: (searchText: string) => void,

  setGenreId: (genreId: number) => void,
  setLanguageId: (languageId: number | undefined) => void,
  setSortOrder: (sortOrder: string) => void,
}

const useClipQueryStore = create<ClipQueryStore>((set) => ({
  // 2)ISSEU: Type '{}' is missing the following properties from type 'ClipQuery': 
  //   languageId, sortOrder, searchTexts(2739)
  clipQuery: {},
  // 3)when search a clip, we should only set the searchText and clear other filters,
  //   cus what if we don’t clear other filters like genre/language,
  //   the user may select the wrong genre/language..
  setSearchText: (searchText) => set(() => ({ 
    clipQuery: { searchText } 
  })),
  setGenreId: (genreId) => set((store) => ({ 
    clipQuery: { ...store.clipQuery, genreId }
  })),
  setLanguageId: (languageId) => set((store) => ({ 
    clipQuery: { ...store.clipQuery, languageId } 
  })),
  setSortOrder: (sortOrder) => set((store) => ({ 
    clipQuery: { ...store.clipQuery, sortOrder } 
  })),
}))

export default useClipQueryStore