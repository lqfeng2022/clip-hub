import Collection from '@/entities/Collection'
import { Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const CollectionCardTitle = ({ list }: { list: Collection }) => {
  const hasItems = list.items_count > 0
  const contentLink = `/profile/collection/${list.slug}`

  return (
    <Link 
      to={hasItems ? contentLink : ''} 
      state={{list}}
    >
      <Text
        fontSize='sm'
        noOfLines={2}
        pt='6px'
        _hover={hasItems ? { color: 'yellow.300' } : {}}
        cursor={hasItems ? 'pointer' : 'default'}
      >
        {list.title}
      </Text>
    </Link>
  )
}

export default CollectionCardTitle