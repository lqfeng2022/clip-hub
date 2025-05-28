import { Avatar, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import SearchInput from './SearchInput'
import { useAuth } from '../AuthContext'

const NavBar = () => {
  const { user } = useAuth()
  // ??: only return right-hand value only if the left side is null or undefined
  const fullName = user?.first_name || user?.last_name
      ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
      : user?.username;
  
  return (
    <HStack p='10px' gap={5} justifyContent='space-between'>
      <Link to='/'>
        <Logo/>
      </Link>
      <SearchInput/>
      {user ? 
        <Link to='/profile'>
          <Avatar
            size='sm'
            fontWeight='bold'
            name={fullName}
            src={user?.portrait}
          />
        </Link>
        : 
        <Link to='/user/signin'>
          <Avatar bg='teal.500' size='sm' />
        </Link>
      }
    </HStack>
  )
}

export default NavBar