import { Product } from '@/entities/Product'
import { truncateAtWord } from './textWorker'

export default function getProductDisplay(product: Product, count: number) {
  if (!product) return { image: null, title: null }

  switch (product.type) {
    case 'video':
      return {
        image: product.content.cover || null,
        title: product.content.title,
      }
    case 'expression':
      return {
        image: product.content.image || null,
        title: product.content.title,
      }
    case 'subtitle':
      return {
        image: product.content.expressions[0]?.image || null, // subtitles do not have image
        title: truncateAtWord(product.content.content, count), // subtitle text
      }
  }
}