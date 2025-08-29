import Word from './Word'

export default interface Alphabet {
  id: number,
  title: string,
  slug: string,
  words_count: number,
  words: Word[]
}