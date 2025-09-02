import { Box, Heading, Image } from '@chakra-ui/react'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileEplike from '../components/profile/ProfileEplike'
import ProfileLists from '../components/profile/ProfileLists'
import ProfileViewHistory from '../components/profile/ProfileViewHistory'
import profileBack from '@/assets/profile-02.jpg'
import { useAuth } from '@/AuthContext'

const Profile = () => { 
  const { user } = useAuth()

  if (!user) 
    return <Heading fontSize='md'>You cannot access this url, please signin</Heading>

  return (
    <Box p={2}>
      <Box
        height='160px'
        borderRadius={5}
        overflow='hidden'
      >
        <Image width='100vw' src={profileBack}/>
      </Box>
      <ProfileUser/>
      <ProfileViewHistory/>
      <ProfileEplike/>
      <ProfileLists/>
    </Box>
  )
}

export default Profile