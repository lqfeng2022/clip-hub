import { Box, Image } from '@chakra-ui/react'
import backImage from '@/assets/profile-back.webp'

const ProfileBack = () => {
  return (
    <Box height='160px' borderRadius={5} overflow='hidden'>
      <Image src={backImage} objectFit='cover'/>
    </Box>
  )
}

export default ProfileBack