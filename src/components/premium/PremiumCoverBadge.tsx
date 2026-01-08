import { Box, Badge, Image } from '@chakra-ui/react'
import bro_image from '@/assets/bro.jpg'

const PremiumCoverBadge = ({ step }: { step: string }) => {
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
        opacity={0.7}
      />
      <Badge 
        position='absolute'
        top={3}
        right={3}
        bg='green.600'
        fontWeight='light'
        px={2} 
        py='2px'
        fontSize='sm'
      >
        {step}
      </Badge>
    </Box>
  )
}

export default PremiumCoverBadge