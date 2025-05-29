import { Button, Heading, Stack } from '@chakra-ui/react'
import ProfileCover from '../components/profile/ProfileCover'
import ProfileForms from '../components/profile/ProfileForms'
import ProfilePortrait from '../components/profile/ProfilePortrait'

const ProfileUser = () => {
  return (
    <>
      <Stack px={2.5} maxW='800px'>
        <Heading py={4}>Profile Customization</Heading>
        <ProfileCover/>
        <ProfilePortrait/>
        <ProfileForms/>
      </Stack>
      <Button m='20px 10px 80px' size='md' fontSize='lg'>
        Publish
      </Button>
    </>
  )
}

export default ProfileUser