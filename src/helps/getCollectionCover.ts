import getProductDisplay from './getProductDisplay'
import nocontent from '@/assets/no-content.png'
import noimage from '@/assets/no-image.jpg'

export default function getCollectionCover(list: any) {
  if (!list?.items?.length) return nocontent

  for (let i = 0; i < list.items.length; i++) {
    const product = list.items[i]?.product
    if (!product) continue

    const { image } = getProductDisplay(product, i)
    if (image) return image
  }

  return noimage
}