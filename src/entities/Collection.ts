import CollectionItem from './CollectionItem'

export default interface Collection {
  id: number,
  title: string,
  slug: string,
  items: CollectionItem[],
  created_at: string,
  updated_at: string,
}