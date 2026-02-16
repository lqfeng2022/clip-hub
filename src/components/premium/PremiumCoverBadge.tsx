import { Box, Badge, Image } from '@chakra-ui/react'

interface Props {
  step: string,
  image: string,
}
const PremiumCoverBadge = ({ step, image }: Props) => {
  return (
    <Box 
      position='relative' 
      maxW='100%'
      overflow='hidden'
      height='150px'
    >
      <Image
        objectFit='cover'
        src={image}
        opacity={0.7}
      />
      <Badge 
        position='absolute'
        top={3}
        right={3}
        bg='green.700'
        fontWeight='light'
        fontSize='0.8em'
      >
        {step}
      </Badge>
    </Box>
  )
}

export default PremiumCoverBadge