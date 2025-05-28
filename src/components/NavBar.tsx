import { Avatar, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import SearchInput from './SearchInput'
import { useAuth } from '../AuthContext'

const NavBar = () => {
  const { user } = useAuth()
  
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
            name={`${user?.first_name} ${user?.last_name}`}
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