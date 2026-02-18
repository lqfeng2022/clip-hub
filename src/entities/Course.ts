import Host from './Host'
import Playlist from './Playlist'

export default interface Course {
  id: number,
  title: string,
  slug: string,
  host: Host,
  cover: string,
  items_count: number,
  playlists: Playlist[],
  created_at: string,
  updated_at: string,
}