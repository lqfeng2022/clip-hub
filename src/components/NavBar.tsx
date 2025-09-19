import { Avatar, Circle, HStack, Icon, Show, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import ClipLogo from './ClipLogo'
import EpLogo from './EpLogo'
import LanguageButton from './LanguageButton'
import SearchInput from './SearchInput'

const NavBar = () => {
  const { user } = useAuth()
  // ??: a simple way of ternary operator, if it's true, return the left..
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username
  const portrait = `https://clipwords.me/${user?.portrait}`

  const [display, setDisplay] = useState(false)

  return (
    <Stack p='16px 10px' gap={5}>
      <HStack gap={5} justifyContent='space-between'>
        <Link to='/'>
          <ClipLogo/>
        </Link>
        <Link to='/expressions'>
          <EpLogo />
        </Link>
        <Show above='md'>
          <SearchInput />
        </Show>
        <Show below='md'>
          <Circle 
            size={8}
            _hover={{ bg: 'gray.700' }}
            onClick={() => setDisplay(!display)}
          >
            <Icon as={BsSearch} boxSize={5}/>
          </Circle>
        </Show>
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
      {display && <SearchInput />}
    </Stack>
  )
}

export default NavBar