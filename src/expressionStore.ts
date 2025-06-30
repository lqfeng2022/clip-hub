import { create } from 'zustand'

interface ExpressionQuery {
  searchText?: string,
  tagId?: number,
  sortOrder?: string,
}

interface ExpressionQueryStore {
  expressionQuery: ExpressionQuery,

  setSearchText: (searchText: string) => void,
  setTagId: (tagId: number) => void,
  setSortOrder: (sortOrder: string) => void,
}

const useExpressionQueryStore = create<ExpressionQueryStore>((set) => ({
  expressionQuery: {},

  setSearchText: (searchText) => set(() => ({ 
    expressionQuery: { searchText } 
  })),

  setTagId: (tagId) => set((store) => ({
    expressionQuery: { ...store.expressionQuery, tagId } 
  })),
  
  setSortOrder: (sortOrder) => set((store) => ({ 
    expressionQuery: { ...store.expressionQuery, sortOrder } 
  })),
}))

export default useExpressionQueryStore