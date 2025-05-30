import { Avatar, Badge, HStack, Icon, Show } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import Logo from './Logo'
import SearchInput from './SearchInput'
import SearchDrawer from './SearchDrawer'
import { TbLanguageKatakana } from "react-icons/tb";

const NavBar = () => {
  const { user } = useAuth()
  // ??: only return right-hand value only if the left side is null or undefined
  const fullName = user?.first_name || user?.last_name
      ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
      : user?.username;
  
  return (
    <HStack p='16px 10px' gap={5} justifyContent='space-between'>
      <Link to='/'>
        <Logo/>
      </Link>
      <Link to='/expression'>
        <Badge 
          variant='subtle' 
          fontSize='1em'
          fontWeight='thin'
          colorScheme='gray' 
          className='tag-hover'
        >
          <Icon 
            as={TbLanguageKatakana}
            boxSize={5}
            color='green.300'
            verticalAlign='bottom'
          /> expression
        </Badge>
      </Link>
      <Show above='sm'><SearchInput /></Show>
      <Show below='sm'><SearchDrawer /></Show>
      {user ? 
        <Link to='/profile'>
          <Avatar
            size='small'
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