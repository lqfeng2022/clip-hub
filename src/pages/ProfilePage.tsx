import { Box, Image } from '@chakra-ui/react'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileEpbook from '../components/profile/ProfileEpbook'
import ProfilePlaylist from '../components/profile/ProfilePlaylist'
import ProfileViewHistory from '../components/profile/ProfileViewHistory'

const Profile = () => {  
  return (
    <Box p={2}>
      <Box
        height='160px'
        borderRadius={5}
        overflow='hidden'
      >
        <Image src='https://bit.ly/naruto-sage'/>
      </Box>
      <ProfileUser/>
      <ProfileViewHistory/>
      <ProfileEpbook/>
      <ProfilePlaylist/>
    </Box>
  )
}

export default Profile