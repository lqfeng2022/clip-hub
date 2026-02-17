import { create } from 'zustand'

export type ProductType = 'expression' | 'subtitle' | 'video' | null

// Convert Host tabs -> type filter
export type HostTab = 'All' | 'Words' | 'Clips' | 'Videos' | 'Playlists'
const hostTabToType = (tab: HostTab): ProductType => {
  switch (tab) {
    case 'Words':   return 'expression'
    case 'Clips':   return 'subtitle'
    case 'Videos':  return 'video'
    default:        return null
  }
}

// Convert Search tabs -> type filter
export type SearchTab = 'Latest' | 'Clips' | 'Words' | 'Videos'
const searchTabToType = (tab: SearchTab): ProductType | undefined => {
  switch (tab) {
    case 'Words':  return 'expression'
    case 'Clips':   return 'subtitle'
    case 'Videos':  return 'video'
    default:       return undefined
  }
}

interface ProductQuery {
  hostId?: number | null
  searchText?: string
  type?: ProductType | undefined
  sortOrder?: string
}

interface Store {
  query: ProductQuery

  // Tabs
  hostTab: HostTab
  searchTab: SearchTab

  setHostId: (id: number | null) => void
  setSearchText: (t: string) => void
  setSortOrder: (t: string) => void

  setHostTab: (tab: HostTab) => void
  setSearchTab: (tab: SearchTab) => void
}

const useProductFilterStore = create<Store>((set) => ({
  query: {
    hostId: null,
    searchText: '',
    type: null,
    sortOrder: undefined,
  },

  // Tabs
  hostTab: 'All',
  searchTab: 'Latest',

  // Basic filters
  setHostId: (hostId) => set((s) => ({
    query: { ...s.query, hostId }
  })),
  setSearchText: (searchText) => set((s) => ({
    query: { ...s.query, searchText }
  })),
  setSortOrder: (sortOrder) => set((s) => ({
    query: { ...s.query, sortOrder }
  })),

  // Tab filters
  setHostTab: (tab) => set((s) => ({
    hostTab: tab,
    query: { ...s.query, type: hostTabToType(tab) }
  })),
  setSearchTab: (tab) => set((s) => ({
    searchTab: tab,
    query: { ...s.query, type: searchTabToType(tab) }
  })),
}))

export default useProductFilterStore