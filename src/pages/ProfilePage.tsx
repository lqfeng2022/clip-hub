import { Box, Image } from '@chakra-ui/react'
import ProfileHistory from '../components/profile/ProfileHistory'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileEpbook from '../components/profile/ProfileEpbook'

const Profile = () => {  
  return (
    <Box p={2}>
      <Box
        height='160px'
        borderRadius={5}
        overflow='hidden'
        bg='gray.500'
      >
        <Image src='https://bit.ly/naruto-sage'/>
      </Box>
      <ProfileUser/>
      <ProfileHistory/>
      <ProfileEpbook/>
    </Box>
  )
}

export default Profile