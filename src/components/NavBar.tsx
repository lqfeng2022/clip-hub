import { Avatar, Button, HStack, Icon } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import ClipLogo from './ClipLogo'
import EpLogo from './EpLogo'
import SearchInputDrawer from './SearchInputDrawer'
import { HiLanguage } from 'react-icons/hi2'
import useLanguageStore from '@/languageStore'

const NavBar = () => {
  const { user } = useAuth()
  // ??: a simple way of ternary operator, if it's true, return the left..
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username
  const portrait = `https://clipwords.me/${user?.portrait}`
  
  const language = useLanguageStore((s) => s.language)
  const setLanguage = useLanguageStore((s) => s.setLanguage)

  const navigate = useNavigate()

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
        onClick={() => setLanguage(language === 'ch' ? 'en' : 'ch')}
      >
        <Icon as={HiLanguage} boxSize='25px' />
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
  )
}

export default NavBar