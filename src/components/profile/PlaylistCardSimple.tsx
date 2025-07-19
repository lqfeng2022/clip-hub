import { Card, CardBody, Heading, HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import nocontent from '@/assets/no-content.png'
import List from '@/entities/List'

const PlaylistCardSimple = ({ list }: { list: List }) => {
  const cover = list.items[0]?.expression.image
  const hasItems = list.items && list.items.length > 0
  const contentLink = `/profile/playlist/${list.slug}`

  return (
    <Card bg='gray.800' variant='unstyled'>
      {hasItems && (
        <Link to={contentLink}>
          <Image 
            aspectRatio={16/9}
            // `cover ? cover : nocontent`
            src={cover ?? nocontent}
            objectFit='cover' 
            className='img-hover' 
          />
        </Link>
      )} 
      {!hasItems && (
        <Image 
          aspectRatio={16/9} 
          src={nocontent} 
          objectFit='cover'
          opacity={0.5} 
        />
      )}
      <CardBody p='8px 4px'>
        <HStack justifyContent='space-between'>
          {hasItems && (
            <Link to={contentLink}>
              <Heading
                fontSize='md'
                noOfLines={2}
                _hover={{ color: 'yellow.400' }}
              >
                {list.title}
              </Heading>
            </Link>
          )} 
          {!hasItems && (
            <Heading fontSize='md' noOfLines={2}>
              {list.title}
            </Heading>
          )}
        </HStack>
      </CardBody>
    </Card>
  )
}

export default PlaylistCardSimple