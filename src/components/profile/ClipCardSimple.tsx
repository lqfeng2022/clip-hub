import { AspectRatio, Card, CardBody, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Clip from '@/entities/Clip';
import useLanguageStore from '@/languageStore';

const ClipCardSimple = ({ clip }: { clip: Clip }) => {
  const lange = useLanguageStore(s => s.language)
  const header =  lange === 'en' && clip.title_ch ? clip.title : clip.title_ch

  return (
    <Card 
      bg='gray.800' 
      borderRadius={10} 
      overflow='hidden' 
      variant='unstyled'
    >
      <AspectRatio ratio={16/9}>
        <Image
          objectFit='cover'
          src={clip.cover}
          className='img-hover'
        />
      </AspectRatio>
      <CardBody p='8px 4px'>
        <Link to={'/clips/' + clip.slug}>
          <Heading 
            fontSize='md' 
            noOfLines={2}  
            _hover={{ color: 'yellow.200' }}
          >
            {header}
          </Heading>
        </Link>
      </CardBody>
    </Card>
  )
}

export default ClipCardSimple