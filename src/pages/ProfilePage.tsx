import { useAuth } from '@/AuthContext'
import ProfileBack from '@/components/profile/ProfileBack'
import { Heading, Stack } from '@chakra-ui/react'
import ProfileEplike from '../components/profile/ProfileEplike'
import ProfileLists from '../components/profile/ProfileLists'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileViewHistory from '../components/profile/ProfileViewHistory'

const Profile = () => { 
  const { user } = useAuth()

  if (!user) return (
      <Heading fontSize='md'>
        You cannot access this url, please signin
      </Heading>
    )

  return (
    <Stack p={2}>
      <ProfileBack/>
      <ProfileUser/>
      <ProfileViewHistory/>
      <ProfileEplike/>
      <ProfileLists/>
    </Stack>
  )
}

export default Profile