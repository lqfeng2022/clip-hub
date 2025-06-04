import ListItem from './ListItem'

export default interface List {
  id: number,
  title: string,
  slug: string,
  timestamp: string,
  items: ListItem[],
}