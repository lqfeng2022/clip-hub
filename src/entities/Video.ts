import Genre from './Genre'

export default interface Video {
  id: number,
  genre: Genre,
  kind: 'REGULAR' | 'SHORT',
  title: string,
  slug: string,
  realse: number,
  original: string,
  cover: string,
  file: string,
  created_at: string,
  updated_at: string,
}