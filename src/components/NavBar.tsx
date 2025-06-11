import { Avatar, HStack, Show } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import ClipLogo from './ClipLogo'
import EpLogo from './EpLogo'
import SearchDrawer from './SearchDrawer'
import SearchInput from './SearchInput'

const NavBar = () => {
  const { user } = useAuth()
  // ??: a simple way of ternary operator, if it's true, return the left..
  const fullName = user?.first_name || user?.last_name
      ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
      : user?.username

  const portrait = `http://localhost:8000/${user?.portrait}`
  
  return (
    <HStack p='16px 10px' gap={5} justifyContent='space-between'>
      {/* Left section */}
      <Link to='/'>
        <ClipLogo/>
      </Link>
      <Link to='/expressions'>
        <EpLogo />
      </Link>
      {/* Center: Search bar */}
      <Show above='sm'><SearchInput /></Show>
      <Show below='sm'><SearchDrawer /></Show>
      {/* Right-end: Avatar */}
      {user ? (
        <Link to='/profile'>
          <Avatar
            size='small'
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
  )
}

export default NavBar