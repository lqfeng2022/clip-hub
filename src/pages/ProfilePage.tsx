import { useAuth } from '@/AuthContext'
import ProfileBack from '@/components/profile/ProfileBack'
import { Heading, Stack } from '@chakra-ui/react'
import ProfileExpressionLike from '../components/profile/ProfileExpressionLike'
import ProfileLists from '../components/profile/ProfileLists'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileViewHistory from '../components/profile/ProfileViewHistory'
import ProfileChatSession from '@/components/profile/ProfileChatSession'

const Profile = () => { 
  const { user } = useAuth()

  return (
    <Stack p={2}>
      <ProfileBack/>
      <ProfileUser/>
      <ProfileChatSession/>
      <ProfileViewHistory/>
      <ProfileExpressionLike/>
      <ProfileLists/>
      {!user && <Heading fontSize='md'>
        You cannot access this url, please signin
      </Heading>}
    </Stack>
  )
}

export default Profile