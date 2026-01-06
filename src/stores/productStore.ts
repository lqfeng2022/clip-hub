import { create } from 'zustand'

interface ProductQuery {
  searchText?: string,
  hostId?: number,
  sortOrder?: string,
}

interface ProductQueryStore {
  productQuery: ProductQuery,

  setSearchText: (searchText: string) => void,
  setHostId: (hostId: number) => void,
  setSortOrder: (sortOrder: string) => void,
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: {},

  setSearchText: (searchText) => set(
    () => ({ productQuery: { searchText } })
  ),
  setHostId: (hostId) => set((store) => ({ 
    productQuery: { ...store.productQuery, hostId } 
  })),
  setSortOrder: (sortOrder) => set((store) => ({ 
    productQuery: { ...store.productQuery, sortOrder } 
  })),
}))

export default useProductQueryStore