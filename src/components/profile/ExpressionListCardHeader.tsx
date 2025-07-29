import List from '@/entities/List'
import { Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ExpressionListCardHeader = ({ list }: { list: List }) => {
  const hasItems = list.items && list.items.length > 0
  const contentLink = `/profile/list/${list.slug}`

  return (
      <>
        {hasItems ? (
          <Link to={contentLink}>
            <Heading
              fontSize='md'
              noOfLines={2}
              _hover={{ color: 'yellow.500' }}
            >
              {list.title}
            </Heading>
          </Link>
          ) : (
          <Heading fontSize='md' noOfLines={2}>
            {list.title}
          </Heading>
        )}
      </>
  )
}

export default ExpressionListCardHeader