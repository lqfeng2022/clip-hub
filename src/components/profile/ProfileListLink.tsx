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
    { name: 'History', name_ch: '浏览记录', icon: VscHistory, link: '/profile/history' },
    { name: 'Liked words', name_ch: '喜欢的表达式', icon: IoMdHeartEmpty, link: '/profile/expression' },
    { name: 'Your Lists', name_ch: '表达式列表', icon: IoIosList, link: '/profile/list' },
  ]

  return (
    <Box mt={8}>
      <Divider my={3} borderColor='gray'/>
      <List>
        {list.map((p) => (
          <ListItem py='20px' key={p.name}>
            <HStack spacing={3}>
              <Icon as={p.icon} boxSize={7} />
              <Link to={p.link}>
                <Text fontSize='lg' as='strong'>
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