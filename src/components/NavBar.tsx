import { Avatar, Badge, Box, Flex, Icon, Show } from '@chakra-ui/react'
import { TbLanguageKatakana } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import Logo from './Logo'
import SearchDrawer from './SearchDrawer'
import SearchInput from './SearchInput'

const NavBar = () => {
  const { user } = useAuth()
  // ??: only return right-hand value only if the left side is null or undefined
  const fullName = user?.first_name || user?.last_name
      ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
      : user?.username;
  
  return (
    <Flex align='center' p='16px 10px' justifyContent='space-between'>
      {/* Left section */}
      <Flex align='center' gap={{ base: 3, md: 5, xl: 10 }}>
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
      </Flex>
      {/* Center: Search bar */}
      <Box flex='1' px={4} display='flex' justifyContent='center' >
        <Box maxW='800px' w='100%'>
          <Show above='sm'><SearchInput /></Show>
          <Show below='sm'><SearchDrawer /></Show>
        </Box>
      </Box>
      {/* Right: Avatar */}
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
    </Flex>
  )
}

export default NavBar