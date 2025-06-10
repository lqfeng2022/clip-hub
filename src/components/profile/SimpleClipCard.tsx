import { Card, CardBody, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Clip from '@/entities/Clip';

const SimpleClipCard = ({ clip }: { clip: Clip }) => {
  return (
    <Card 
      bg='gray.800' 
      borderRadius={10} 
      overflow='hidden' 
      variant='unstyled'
    >
      <Image
        w='100%'
        objectFit='cover'
        src={clip.cover}
      />
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