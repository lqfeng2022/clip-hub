import { Box, Image } from '@chakra-ui/react'
import ProfileClipViewHistory from '../components/profile/ProfileClipViewHistory'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileExpressionSave from '../components/profile/ProfileExpressionSave'
import ProfileClipLike from '../components/profile/ProfileClipLike'
import ProfilePlaylist from '../components/profile/ProfilePlaylist'

const Profile = () => {  
  return (
    <Box p={2}>
      <Box
        height='160px'
        borderRadius={5}
        overflow='hidden'
        bg='gray.500'
      >
        <Image src='https://bit.ly/naruto-sage'/>
      </Box>
      <ProfileUser/>
      <ProfileExpressionSave/>
      <ProfileClipLike/>
      <ProfilePlaylist/>
      <ProfileClipViewHistory/>
    </Box>
  )
}

export default Profile