import { Card, CardBody, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Clip from '../entities/Clip'

interface Props {
  clip: Clip
}
const SimpleClipCard = ({ clip }: Props) => {
  return (
    <Card bg='gray.800' borderRadius={10} overflow='hidden'>
      <Link to={'/clips/' + clip.slug}>
        <Image src={clip.cover} className='img-hover'/>
      </Link>
      <CardBody p='8px 4px'>
        <Link to={'/clips/' + clip.slug}>
          <Heading 
            fontSize='md' 
            noOfLines={2}  
            _hover={{ color: 'yellow.200' }}
          >
            {clip.title}
          </Heading>
        </Link>
      </CardBody>
    </Card>
  )
}

export default SimpleClipCard