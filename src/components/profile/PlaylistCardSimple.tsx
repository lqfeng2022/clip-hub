import { Card, CardBody, Heading, HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import nocontent from '../../assets/no-content.png'
import List from '../../entities/List'

const SimplePlaylistCard = ({ list }: { list: List }) => {
  const cover = list.items[0]?.video.cover
  const hasItems = list.items && list.items.length > 0
  const contentLink = `/profile/playlist/${list.slug}`

  return (
    <Card bg='gray.800' variant='unstyled'>
      {hasItems ? (
        <Link to={contentLink}>
          <Image 
            aspectRatio={16/9}
            // `cover ? cover : nocontent`
            src={cover ?? nocontent}
            objectFit='cover' 
            className='img-hover' 
          />
        </Link>
      ) : (
        <Image 
          aspectRatio={16/9} 
          src={nocontent} 
          objectFit='cover'
          opacity={0.5} 
        />
      )}
      <CardBody p='4px'>
        <HStack justifyContent='space-between'>
          {hasItems ? (
            <Link to={contentLink}>
              <Heading
                fontSize='md'
                noOfLines={2}
                _hover={{ color: 'yellow.400' }}
              >
                {list.title}
              </Heading>
            </Link>
          ) : (
            <Heading fontSize='md' noOfLines={2}>
              {list.title}
            </Heading>
          )}
        </HStack>
      </CardBody>
    </Card>
  )
}

export default SimplePlaylistCard