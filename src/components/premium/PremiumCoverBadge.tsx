import { Box, Badge, Image } from '@chakra-ui/react'
import bro_image from '@/assets/bro.jpg'

const PremiumCoverBadge = () => {
  return (
    <Box 
      position='relative' 
      maxW='100%'
      overflow='hidden'
      height='150px'
    >
      <Image
        objectFit='cover'
        src={bro_image}
        opacity={0.8}
      />
      <Badge 
        position='absolute'
        top={3}
        right={3}
        bg='green'
        fontWeight='light'
        px={2} fontSize='lg'
      >
        starter
      </Badge>
    </Box>
  )
}

export default PremiumCoverBadge