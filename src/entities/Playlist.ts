import Course from './Course'

export default interface Playlist {
  short_uuid: string,
  title: string,
  slug: string,
  course: Course,
  product_count: number,
  cover: string,
  created_at: string,
  updated_at: string,
}