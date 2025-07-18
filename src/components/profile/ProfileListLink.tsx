import { Box, Divider, HStack, Icon, List, ListItem, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { IoIosList } from 'react-icons/io'
import { VscHistory } from 'react-icons/vsc'
import { IoMdHeartEmpty } from 'react-icons/io'
import { HiOutlineUser } from 'react-icons/hi2'
import useLanguageStore from '@/languageStore'

const ProfileListLink = () => {
  const lang = useLanguageStore(s => s.language)

  const list = [
    { name: 'Profile', name_ch: '个人资料', icon: HiOutlineUser, link: '/profile' },
    { name: 'Clip history', name_ch: '视频历史', icon: VscHistory, link: '/profile/history' },
    { name: 'Your words', name_ch: '你的表达式', icon: IoMdHeartEmpty, link: '/profile/expression' },
    { name: 'Playlists', name_ch: '视频播放列表', icon: IoIosList, link: '/profile/playlist' },
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