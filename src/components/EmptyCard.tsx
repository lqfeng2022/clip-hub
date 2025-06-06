import { Card, Image } from '@chakra-ui/react';
import nocontent from '../assets/no-content.png'

const EmptyCard = () => {
  return (
    <Card 
      bg='gray.800' 
      borderRadius={10} 
      overflow='hidden' 
      variant='unstyled'
      opacity={0.5}
    >
      <Image w='100%' objectFit='cover' src={nocontent} />
    </Card>
  )
}

export default EmptyCard