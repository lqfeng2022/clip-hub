import { Box, Divider, HStack, Icon, List, ListItem, Text } from '@chakra-ui/react'
import { IoLanguageOutline } from 'react-icons/io5'
import { IoIosList } from 'react-icons/io'
import { VscHistory } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { IoMdHeartEmpty } from 'react-icons/io'
import { HiOutlineUser } from 'react-icons/hi2'


const ProfileList = () => {
  const list = [
    { name: 'Profile', icon: HiOutlineUser, link: '/profile' },
    { name: 'Your words', icon: IoLanguageOutline, link: '/profile/expression' },
    { name: 'Clip history', icon: VscHistory, link: '/profile/history' },
    { name: 'Liked clips', icon: IoMdHeartEmpty, link: '/profile/like' },
    { name: 'Playlists', icon: IoIosList, link: '/profile/playlist' },
  ]

  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <List>
        {list.map((p) => (
          <ListItem py='20px' key={p.name}>
            <HStack spacing={3}>
              <Icon as={p.icon} boxSize={8} />
              <Link to={p.link}>
                <Text fontSize='lg'>{p.name}</Text>
              </Link>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ProfileList