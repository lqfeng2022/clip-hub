import { create } from 'zustand'

interface ExpressionQuery {
  languageId?: number,
  tagId?: number,
  sortOrder?: string,
  searchText?: string,
}

interface ExpressionQueryStore {
  expressionQuery: ExpressionQuery,
  setSearchText: (searchText: string) => void,
  setLanguageId: (platformId: number) => void,
  setTagId: (tagId: number) => void,
  setSortOrder: (sortOrder: string) => void,
}

const useExpressionQueryStore = create<ExpressionQueryStore>(
  (set) => ({
  expressionQuery: {},

  setSearchText: (searchText) => set(() => ({ 
    expressionQuery: { searchText } 
  })),

  setLanguageId: (languageId) => set((store) => ({ 
    expressionQuery: { ...store.expressionQuery, languageId } 
  })),

  setTagId: (tagId) => set((store) => ({
    expressionQuery: { ...store.expressionQuery, tagId } 
  })),
  
  setSortOrder: (sortOrder) => set((store) => ({ 
    expressionQuery: { ...store.expressionQuery, sortOrder } 
  })),
}))

export default useExpressionQueryStore