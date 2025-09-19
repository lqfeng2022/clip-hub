import useLanguageStore from '@/languageStore'
import { Avatar, Button, Circle, HStack, Icon, Show, Stack } from '@chakra-ui/react'
import { FaLanguage } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import ClipLogo from './ClipLogo'
import EpLogo from './EpLogo'
import SearchInput from './SearchInput'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const NavBar = () => {
  const { user } = useAuth()
  // ??: a simple way of ternary operator, if it's true, return the left..
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username
  const portrait = `https://clipwords.me/${user?.portrait}`
  
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)

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
        <Button
          colorScheme='gray'
          variant='link'
          onClick={() => setLanguage(language === 'ch' ? 'en' : 'ch')}
        >
          <Icon as={FaLanguage} boxSize='35px' />
        </Button>
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