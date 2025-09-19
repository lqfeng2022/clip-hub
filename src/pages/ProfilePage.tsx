import { Box, Heading, Text } from '@chakra-ui/react'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileEplike from '../components/profile/ProfileEplike'
import ProfileLists from '../components/profile/ProfileLists'
import ProfileViewHistory from '../components/profile/ProfileViewHistory'
import { useAuth } from '@/AuthContext'

const Profile = () => { 
  const { user } = useAuth()

  if (!user) return (
      <Heading fontSize='md'>
        You cannot access this url, please signin
      </Heading>
    )

  return (
    <Box p={2}>
      <Box
        height='160px'
        borderRadius={5}
        bgGradient='linear(to-r, gray.200, gray.400, gray.600)'
      >
        <Text p={5}>
          Hey there! I’m <strong>Simon Lee</strong>, the creator of <i>ClipWords</i>. 
          I’m creating <strong>a fun AI agent</strong> on top of our English Expression database. 
          Think of it as <strong>a friendly companion</strong> — witty, supportive, and always up 
          for a conversation — here to help you learn.
        </Text>
      </Box>
      <ProfileUser/>
      <ProfileViewHistory/>
      <ProfileEplike/>
      <ProfileLists/>
    </Box>
  )
}

export default Profile