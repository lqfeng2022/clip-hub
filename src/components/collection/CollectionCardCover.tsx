import { Box, Image, AspectRatio } from '@chakra-ui/react'
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
        width={{ base: '50vw', sm: '300px' }}   // fixed width instead of only maxW
        flex='0 0 auto'                        // prevent shrinking in row layout
        border='2px' 
        borderRadius='10px' 
        borderColor='gray.700' 
        overflow='hidden'
      >
        <AspectRatio ratio={16 / 9} width='100%'>
          <Image
            src={image}
            objectFit='cover'
            className={hasItems ? 'img-hover' : ''}
            opacity={hasItems ? 1 : 0.5}
            cursor={hasItems ? 'pointer' : 'default'}
            alt={list.title || 'collection cover'}
            width='100%'
            height='100%'
          />
        </AspectRatio>
        <CollectionCardIcon/>
      </Box>
    </Link>
  )
}

export default CollectionCardCover