import { Box, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import CollectionCardIcon from './CollectionCardIcon'
import Collection from '@/entities/Collection'
import getCollectionCover from '@/helps/getCollectionCover'

const CollectionCardCover = ({ list }: { list: Collection }) => {
  const hasItems = list.items && list.items.length > 0
  const contentLink = `/profile/collection/${list.slug}`
  const image = getCollectionCover(list)
  
  return (
    <Link 
      to={hasItems ? contentLink : ''}
      state={{list}}
    >
      <Box 
        position='relative' 
        maxW={{base: '50vw', sm: '300px'}}
        border='2px' 
        borderRadius='10px' 
        borderColor='gray.700' 
        overflow='hidden'
        >
        <Image
          aspectRatio={16/9}
          src={image}
          objectFit='cover'
          className={hasItems ? 'img-hover' : ''}
          opacity={hasItems ? 1 : 0.5}
          cursor={hasItems ? 'pointer' : 'default'}
        />
        <CollectionCardIcon/>
      </Box>
    </Link>
  )
}

export default CollectionCardCover