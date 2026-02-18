import { create } from 'zustand'

interface PlaylistQuery {
  hostId?: number,
}

interface PlaylistQueryStore {
  playlistQuery: PlaylistQuery,

  setHostId: (hostId: number) => void,
}

const usePlaylistQueryStore = create<PlaylistQueryStore>((set) => ({
  playlistQuery: {},

  setHostId: (hostId) => set((store) => ({ 
    playlistQuery: { ...store.playlistQuery, hostId } 
  })),
}))

export default usePlaylistQueryStore