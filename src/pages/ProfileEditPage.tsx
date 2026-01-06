import useLanguageStore from '@/stores/languageStore'
import { Heading, Stack } from '@chakra-ui/react'
import UserProfile from '../components/profile/UserProfile'
import ProfileForms from '../components/profile/ProfileForms'
import profilePagesData from '@/data/profilePagesData'
import PageNavTab from '@/components/PageNavTab'

const ProfileEditPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? profilePagesData.en.profile : profilePagesData.zh.profile

  return (
    <Stack>
      <PageNavTab title={'Edit Profile'}/>
      <UserProfile/>
      <Heading px={4} pt={4}>{header}</Heading>
      <ProfileForms />
    </Stack>
  )
}

export default ProfileEditPage