import { Product } from './Product'

export default interface Interact {
  id: number,
  product: Product,
  visible: boolean,
  created_at: string,
  updated_at: string
}