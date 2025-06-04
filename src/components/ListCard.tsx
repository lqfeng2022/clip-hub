import { Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import nocontent from '../assets/no-content.png'
import List from '../entities/List'

interface Props {
  list: List
}
const ListCard = ({ list }: Props) => {
  const cover = list.items[0]?.video.cover
  const hasItems = list.items && list.items.length > 0

  const cardContent = (
    <Card bg='gray.800' borderRadius={10} overflow='hidden'>
      <Image 
        aspectRatio={ 16/9}
        src={cover ? cover : nocontent} 
        objectFit='cover' 
        className='img-hover' 
      />
      <CardBody p='8px 4px'>
        <Heading 
          fontSize='md' 
          noOfLines={2}  
          _hover={{ color: 'gray.200' }}
        >
          {list.title}
        </Heading>
      </CardBody>
    </Card>
  )

  return hasItems ? (
    <Link to={`/profile/playlist/${list.slug}`}>
      {cardContent}
    </Link>
  ) : cardContent
}

export default ListCard