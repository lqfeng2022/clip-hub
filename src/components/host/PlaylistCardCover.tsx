import { Box, Image, AspectRatio } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import CollectionCardIcon from '../collection/CollectionCardIcon'
import Playlist from '@/entities/Playlist'

const PlaylistCardCover = ({ list }: { list: Playlist }) => {
  const contentLink = `/profile/collection/${list.slug}`
  
  return (
    <Link to={contentLink} state={{list}}>
      <Box 
        position='relative' 
        width={{ base: '50vw', sm: '300px' }}   // fixed width instead of only maxW
        flex='0 0 auto'                        // prevent shrinking in row layout
        border='1px' 
        borderRadius='10px' 
        borderColor='gray.800' 
        overflow='hidden'
      >
        <AspectRatio ratio={16 / 9} width='100%'>
          <Image
            src={list.cover}
            objectFit='cover'
            className={'img-hover'}
            cursor='pointer'
            width='100%'
            height='100%'
          />
        </AspectRatio>
        <CollectionCardIcon count={list.items_count}/>
      </Box>
    </Link>
  )
}

export default PlaylistCardCover