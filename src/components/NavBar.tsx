import { Avatar, HStack, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import ClipLogo from './ClipLogo'
import EpLogo from './EpLogo'
import LanguageButton from './LanguageButton'
import SearchInputDrawer from './SearchInputDrawer'

const NavBar = () => {
  const { user } = useAuth()
  // ??: a simple way of ternary operator, if it's true, return the left..
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username
  const portrait = `https://clipwords.me/${user?.portrait}`

  return (
    <Stack p='16px 10px' gap={5}>
      <HStack gap={5} justifyContent='space-between'>
        <Link to='/'>
          <ClipLogo/>
        </Link>
        <Link to='/expressions'>
          <EpLogo />
        </Link>
        <SearchInputDrawer/>
        <LanguageButton/>
        {user ? (
          <Link to='/profile'>
            <Avatar
              size='sm'
              fontWeight='bold'
              name={fullName}
              src={user?.portrait ? portrait : ''}
            />
          </Link>
        ) : (
          <Link to='/user/signin'>
            <Avatar bg='teal.500' size='sm' />
          </Link>
        )}
      </HStack>
    </Stack>
  )
}

export default NavBar