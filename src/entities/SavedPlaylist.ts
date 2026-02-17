import Playlist from './Playlist';

export default interface SavedPlaylist {
  id: number,
  playlist: Playlist,
  saved_at: string,
}