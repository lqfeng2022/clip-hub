import useLanguageStore from '@/stores/languageStore'
import { Heading, Stack } from '@chakra-ui/react'
import UserProfile from '../components/profile/UserProfile'
import ProfileForms from '../components/profile/ProfileForms'
import profilePagesData from '@/data/profilePagesData'
import PageNavTab from '@/components/PageNavTab'

const ProfileEditPage = () => {
  const lang = useLanguageStore(s => s.language)
  
  const navHeader = lang === 'en'
    ? profilePagesData.en.edit : profilePagesData.zh.edit

  const header = lang === 'en' 
    ? profilePagesData.en.settings : profilePagesData.zh.settings

  return (
    <Stack gap={0}>
      <PageNavTab title={navHeader}/>
      <UserProfile/>
      <Heading px={4} pt={5} fontSize='2xl'>
        {header}
      </Heading>
      <ProfileForms />
    </Stack>
  )
}

export default ProfileEditPage