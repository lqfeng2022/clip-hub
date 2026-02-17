import { create } from 'zustand'

interface PlaylistQuery {
  hostId?: number,
}

interface PlaylistQueryStore {
  productQuery: PlaylistQuery,

  setHostId: (hostId: number) => void,
}

const usePlaylistQueryStore = create<PlaylistQueryStore>((set) => ({
  productQuery: {},

  setHostId: (hostId) => set((store) => ({ 
    productQuery: { ...store.productQuery, hostId } 
  })),
}))

export default usePlaylistQueryStore