import { Box, Heading, Image, Stack } from '@chakra-ui/react'
import ProfileUserForms from '../components/profile/ProfileUserForms'
import ProfileUser from '../components/profile/ProfileUser'
import useLanguageStore from '@/languageStore'
import profileBack from '@/assets/profile-02.jpg'

const ProfileUserPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' ? 'Profile Settings' : '个人信息设置'

  return (
    <Stack p={2}>
      <Box
        height='160px'
        borderRadius={5}
        overflow='hidden'
        bg='gray.500'
      >
        <Image width='100vw' src={profileBack}/>
      </Box>
      <ProfileUser/>
      <Heading py={4}>{header}</Heading>
      <ProfileUserForms />
    </Stack>
  )
}

export default ProfileUserPage