import Video from './Video'
import Expression from './Expression'
import Host from './Host'
import Subtitle from './Subtitle'

export interface ProductBase {
  id: number,
  host: Host,
  views_count: number,
  likes_count: number,
  bookmarks_count: number,
  like_state: boolean,
  bookmark_state: boolean,
  visible: boolean,
  followed: boolean,
  chat_state: boolean,
  created_at: string,
  updated_at: string,
}

export interface VideoProduct extends ProductBase {
  type: 'video'
  content: Video
}

export interface SubtitleProduct extends ProductBase {
  type: 'subtitle'
  content: Subtitle
}

export interface ExpressionProduct extends ProductBase {
  type: 'expression'
  content: Expression
}

export type Product =
  | VideoProduct
  | SubtitleProduct
  | ExpressionProduct