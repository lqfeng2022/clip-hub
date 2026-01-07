import Collection from '@/entities/Collection'
import { Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const CollectionCardTitle = ({ list }: { list: Collection }) => {
  const hasItems = list.items && list.items.length > 0
  const contentLink = `/profile/collection/${list.slug}`

  return (
    <Link 
      to={hasItems ? contentLink : ''} 
      state={{list}}
    >
      <Heading
        fontSize='sm'
        noOfLines={2}
        pt='6px'
        _hover={hasItems ? { color: 'yellow.300' } : {}}
        cursor={hasItems ? 'pointer' : 'default'}
      >
        {list.title}
      </Heading>
    </Link>
  )
}

export default CollectionCardTitle