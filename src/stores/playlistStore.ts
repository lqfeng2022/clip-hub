import { create } from 'zustand'

interface PlaylistQuery {
  hostId?: number,
}

interface PlaylistQueryStore {
  playlistQuery: PlaylistQuery,

  setCourseId: (courseId: number) => void,
}

const usePlaylistQueryStore = create<PlaylistQueryStore>((set) => ({
  playlistQuery: {},

  setCourseId: (courseId) => set((store) => ({ 
    playlistQuery: { ...store.playlistQuery, courseId } 
  })),
}))

export default usePlaylistQueryStore