import { Box, Heading, HStack, Icon, List, ListItem, Text } from '@chakra-ui/react';
import { CiBookmark, CiClock2, CiHeart, CiUser } from 'react-icons/ci';
import { HiLanguage } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const ProfileList = () => {
  const list = [
    { name: 'Profile', icon: CiUser, link: '/profile/me' },
    { name: 'History', icon: CiClock2, link: '/' },
    { name: 'Like', icon: CiHeart, link: '/' },
    { name: 'Bookmark', icon: CiBookmark, link: '/' },
    { name: 'Expression', icon: HiLanguage, link: '/' },
  ]

  return (
    <Box mt={8}>
      <Heading fontSize='2xl' mb={3}>
        Profile List
      </Heading>
      <List>
        {list.map((p) => (
          <ListItem py='20px' key={p.name}>
            <HStack spacing={4}>
              <Icon as={p.icon} boxSize={9}/>
              <Link to={p.link}>
                <Text fontSize='xl'>{p.name}</Text>
              </Link>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default ProfileList