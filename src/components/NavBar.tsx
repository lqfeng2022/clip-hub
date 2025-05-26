import { HStack, Text } from '@chakra-ui/react'
import SearchInput from './SearchInput'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const NavBar = () => {
  return (
    <HStack p='10px' gap={5} justifyContent='space-between'>
      <Link to='/'>
        <Logo/>
      </Link>
      <SearchInput/>
      <Link to='/profile'>
        <Text>Profile</Text>
      </Link>
    </HStack>
  )
}

export default NavBar