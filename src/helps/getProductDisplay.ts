import { Product } from '@/entities/Product'

export default function getProductDisplay(product: Product) {
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
        title: product.content.title, // subtitle text
      }
  }
}