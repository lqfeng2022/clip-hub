import { Card, CardBody, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Clip from '../entities/Clip'

interface Props {
  clip: Clip
}
const SimpleClipCard = ({ clip }: Props) => {
  return (
    <Card bg='gray.800'>
      <Link to={'/clips/' + clip.slug}>
        <Image src={clip.cover} className='img-hover'/>
      </Link>
      <CardBody p='8px 4px'>
        <Heading fontSize='md' noOfLines={2}  _hover={{ color: 'gray.200' }}>
          <Link to={'/clips/' + clip.slug}>
            {clip.title}
          </Link>
        </Heading>
        <Text as='b' py={1} fontSize='sm' color='yellow.200'>
          {clip.genre.title}
        </Text>
      </CardBody>
    </Card>
  )
}

export default SimpleClipCard