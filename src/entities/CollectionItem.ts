import { Product } from './Product'

export default interface CollectionItem {
  id: number,
  visible: boolean,
  product: Product,
  created_at: string,
  updated_at: string,
}