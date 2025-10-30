import { Avatar, Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaBloggerB } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useSignout from '@/hooks/useSignout'
import { useAuth } from '@/AuthContext'
import useLanguageStore from '@/languageStore'
import profilePages from '@/data/profilePages'

const ProfileUser = () => {
  const lang = useLanguageStore(s => s.language)
  const buttons = lang === 'en' ? profilePages.en : profilePages.zh

  const { user, setUser } = useAuth()
  const { mutate } = useSignout()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username;

  const handleLogout = () => {
    // `undefined`: make React Query happy, cus here we don't pass any data
    // ``: React Query lifecycle callback that fires after the mutation completes successfully
    mutate(undefined, {
      onSuccess: () => {
        setUser(null)
        queryClient.removeQueries(['profile']) // clears user
        navigate('/')
        window.location.reload() // clear auth context
      }
    })
  }

  const portraitUrl = `https://clipwords.me/${user?.portrait}`

  const location = useLocation()
  const isProfileMePage = location.pathname.startsWith('/profile/me')

  return (
    <Box mt={8} px={2}>
      <HStack align='flex-start' wrap='wrap' spacing={4}>
        <Avatar 
          size='large' 
          fontWeight='bold' 
          name={fullName} 
          src={user?.portrait ? portraitUrl : ''}
        />
        <Box flex='1'>
          <Heading fontSize='4xl'>
            {`${user?.first_name} ${user?.last_name}`}
          </Heading>
          <HStack gap={5}>
            <Text fontSize='lg' color='gray.300' py={1}>
              {`@${user?.username}`}
            </Text>
          </HStack>
          <HStack py={2} justifyContent='space-between'>
            <Button leftIcon={<FaBloggerB/>} size='sm' disabled>
              Be a Bro
            </Button>
            {isProfileMePage ? (
              <Button size='sm' variant='outline' onClick={handleLogout}>
                {buttons.logout}
              </Button>
            ) : (<Link to='/profile/me'>
              <Button size='sm' variant='solid'>{buttons.edit}</Button>
            </Link>
            )}
          </HStack>
        </Box>
      </HStack>
    </Box>
  )
}

export default ProfileUser