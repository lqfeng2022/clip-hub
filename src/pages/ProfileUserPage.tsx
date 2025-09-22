import ProfileBack from '@/components/profile/ProfileBack'
import useLanguageStore from '@/languageStore'
import { Heading, Stack } from '@chakra-ui/react'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileUserForms from '../components/profile/ProfileUserForms'

const ProfileUserPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' ? 'Profile Settings' : '个人信息设置'

  return (
    <Stack p={2}>
      <ProfileBack/>
      <ProfileUser/>
      <Heading py={4} px={1}>{header}</Heading>
      <ProfileUserForms />
    </Stack>
  )
}

export default ProfileUserPage