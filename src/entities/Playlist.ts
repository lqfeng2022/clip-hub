import Host from './Host'

export default interface Playlist {
  short_uuid: string,
  title: string,
  slug: string,
  host: Host,
  product_count: number,
  cover: string,
  created_at: string,
  updated_at: string,
}