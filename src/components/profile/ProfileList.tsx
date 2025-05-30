import { 
  Box, Divider, HStack, Icon, List, ListItem, Text 
} from '@chakra-ui/react';
import { CiBookmark, CiClock2, CiHeart, CiUser } from 'react-icons/ci';
import { HiLanguage } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const ProfileList = () => {
  const list = [
    { name: 'Expression', icon: HiLanguage, link: '/profile/expression' },
    { name: 'Like', icon: CiHeart, link: '/profile/like' },
    { name: 'Bookmark', icon: CiBookmark, link: '/profile/bookmark' },
    { name: 'History', icon: CiClock2, link: '/profile/history' },
    { name: 'Profile', icon: CiUser, link: '/profile/me' },
  ]

  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <List>
        {list.map((p) => (
          <ListItem py='20px' key={p.name}>
            <HStack spacing={3}>
              <Icon as={p.icon} boxSize={7}/>
              <Link to={p.link}>
                <Text fontSize='sm'>{p.name}</Text>
              </Link>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ProfileList