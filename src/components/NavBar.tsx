import { Avatar, Button, HStack, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import ClipLogo from './ClipLogo'
import EpLogo from './EpLogo'
import SearchInputDrawer from './SearchInputDrawer'
import { HiLanguage } from 'react-icons/hi2'

const NavBar = () => {
  const { user } = useAuth()
  // ??: a simple way of ternary operator, if it's true, return the left..
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username

  const portrait = `http://localhost:8000/${user?.portrait}`
  
  return (
    <HStack p='16px 10px' gap={5} justifyContent='space-between'>
      <Link to='/'>
        <ClipLogo/>
      </Link>
      <Link to='/expressions'>
        <EpLogo />
      </Link>
      <SearchInputDrawer />
      <Button
        colorScheme='gray'
        variant='link'
      >
        <Icon as={HiLanguage} boxSize='25px' />
      </Button>
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