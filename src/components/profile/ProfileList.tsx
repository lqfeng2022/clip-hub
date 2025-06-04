import { 
  Box, Divider, HStack, Icon, List, ListItem, Text 
} from '@chakra-ui/react'
import { CiBookmark, CiHeart, CiUser } from 'react-icons/ci'
import { HiLanguage } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { FiClock } from 'react-icons/fi'

const ProfileList = () => {
  const list = [
    { name: 'View history', icon: FiClock, link: '/profile/history' },
    { name: 'Liked clips', icon: CiHeart, link: '/profile/like' },
    { name: 'Saved clips', icon: CiBookmark, link: '/profile/bookmark' },
    { name: 'Your Expressions', icon: HiLanguage, link: '/profile/expression' },
    { name: 'Profile', icon: CiUser, link: '/profile/me' },
  ]

  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <List>
        {list.map((p) => (
          <ListItem py='20px' key={p.name}>
            <HStack spacing={3}>
              {/* Ignoring the React Icon `dataName` prop warning, it's okay */}
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