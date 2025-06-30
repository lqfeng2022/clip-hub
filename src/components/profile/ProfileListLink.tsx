import { Box, Divider, HStack, Icon, List, ListItem, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { IoLanguageOutline } from 'react-icons/io5'
import { IoIosList } from 'react-icons/io'
import { VscHistory } from 'react-icons/vsc'
import { IoMdHeartEmpty } from 'react-icons/io'
import { HiOutlineUser } from 'react-icons/hi2'
import useLanguageStore from '@/languageStore'

const ProfileListLink = () => {
  const lang = useLanguageStore(s => s.language)

  const list = [
    { name: 'Profile', 'name_ch': '个人资料', icon: HiOutlineUser, link: '/profile' },
    { name: 'Your words', 'name_ch': '你的表达式', icon: IoLanguageOutline, link: '/profile/expression' },
    { name: 'Clip history', 'name_ch': '视频历史', icon: VscHistory, link: '/profile/history' },
    { name: 'Liked clips', 'name_ch': '喜欢的视频', icon: IoMdHeartEmpty, link: '/profile/like' },
    { name: 'Playlists', 'name_ch': '视频播放列表', icon: IoIosList, link: '/profile/playlist' },
  ]

  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <List>
        {list.map((p) => (
          <ListItem py='20px' key={p.name}>
            <HStack spacing={3}>
              <Icon as={p.icon} boxSize={7} />
              <Link to={p.link}>
                <Text fontSize='lg'>
                  {lang === 'en' ? p.name : p.name_ch}
                </Text>
              </Link>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ProfileListLink