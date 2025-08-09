import { Box, Image } from '@chakra-ui/react'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileEplike from '../components/profile/ProfileEplike'
import ProfileLists from '../components/profile/ProfileLists'
import ProfileViewHistory from '../components/profile/ProfileViewHistory'
import profileBack from '@/assets/profile-02.jpg'

const Profile = () => {  
  return (
    <Box p={2}>
      <Box
        height='160px'
        borderRadius={5}
        overflow='hidden'
      >
        <Image src={profileBack}/>
      </Box>
      <ProfileUser/>
      <ProfileViewHistory/>
      <ProfileEplike/>
      <ProfileLists/>
    </Box>
  )
}

export default Profile