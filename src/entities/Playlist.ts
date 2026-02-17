import Host from './Host'

export default interface Playlist {
  short_uuid: string,
  title: string,
  slug: string,
  host: Host,
  items_count: number,
  first_thumbnail: string,
  created_at: string,
  updated_at: string,
}