import { Box, Image } from '@chakra-ui/react'
import ProfileUser from '../components/profile/ProfileUser'
import ProfileExpressionSave from '../components/profile/ProfileExpressionSave'
import ProfileClipLike from '../components/profile/ProfileClipLike'
import ProfilePlaylist from '../components/profile/ProfilePlaylist'
import ProfileClipViewHistory from '../components/profile/ProfileClipViewHistory'

const Profile = () => {  
  return (
    <Box p={2}>
      <Box
        height='160px'
        borderRadius={5}
        overflow='hidden'
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