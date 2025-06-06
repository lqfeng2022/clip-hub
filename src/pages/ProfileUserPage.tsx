import { Button, Heading, Stack } from '@chakra-ui/react'
import ProfileCover from '../components/profile/ProfileCover'
import ProfileForms from '../components/profile/ProfileForms'
import ProfilePortrait from '../components/profile/ProfilePortrait'
import { useAuth } from '../AuthContext'

const ProfileUserPage = () => {
  const { user } = useAuth()

  if (!user) return null
  return (
    <>
      <Stack px={2.5} maxW='800px'>
        <Heading py={4}>Profile Settings</Heading>
        <ProfileCover user={user}/>
        <ProfilePortrait user={user}/>
        <ProfileForms user={user}/>
      </Stack>
      <Button m='20px 10px 80px' size='md' fontSize='lg'>
        Publish
      </Button>
    </>
  )
}

export default ProfileUserPage