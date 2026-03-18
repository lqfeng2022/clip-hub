import useLanguageStore from '@/stores/languageStore'
import { Box, HStack, Icon, List, ListItem, Show, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import ClipLogo from './ClipLogo'
import navListData from '@/data/navListData'
import UserAvatarBottom from './UserAvatarBottom'
import { useAuth } from '@/AuthContext'
import NavChatButton from './NavChatButton'

const NavList = () => {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const lang = useLanguageStore(s => s.language)

  return (
    <Box 
      py={5}
      px={{base: 1, md: 5}}
      display='flex' 
      flexDirection='column' 
      height='100vh'
      overflowY='auto'
    >
      <ClipLogo/>
      <List>
        {navListData.map((p) => (
          <ListItem
            key={p.title}
            p='10px 15px' my={2}
            _hover={{ bg: 'gray.700', borderRadius: 'full' }}
          >
            <Link to={user ? p.link : p.link2}>
              <HStack spacing={5}>
                <Icon
                  as={pathname === p.link ? p.icon2 : p.icon}
                  boxSize='28px' color='gray.200'
                />
                <Show above='lg'>
                  <Text 
                    fontSize='lg'
                    color='gray.100'
                    fontWeight={pathname === p.link ? 'bold' : 'semibold'}
                  >
                    {lang === 'en' ? p.title : p.title_ch}
                  </Text>
                </Show>
              </HStack>
            </Link>
          </ListItem>
        ))}
      </List>
      <Show above='lg'>
        <NavChatButton/>
      </Show>
      <UserAvatarBottom/>
    </Box>
  )
}

export default NavList