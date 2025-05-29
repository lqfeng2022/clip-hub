import { create } from 'zustand'

interface ExpressionQuery {
  languageId?: number,
  sortOrder?: string,
  searchText?: string,
}

interface ExpressionQueryStore {
  expressionQuery: ExpressionQuery,
  setSearchText: (searchText: string) => void,
  setLanguageId: (platformId: number) => void,
  setSortOrder: (sortOrder: string) => void,
}

const useExpressionQueryStore = create<ExpressionQueryStore>(
  (set) => ({
  expressionQuery: {},

  setSearchText: (searchText) => set(() => ({ 
    expressionQuery: { searchText } })),

  setLanguageId: (languageId) => set((store) => ({ 
    expressionQuery: { ...store.expressionQuery, languageId } })),

  setSortOrder: (sortOrder) => set((store) => ({ 
    expressionQuery: { ...store.expressionQuery, sortOrder } })),
}))

export default useExpressionQueryStore