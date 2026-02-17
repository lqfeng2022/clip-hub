import { Product } from './Product';

export default interface PlaylistItem {
  id: number,
  product: Product,
  created_at: string,
  updated_at: string,
}