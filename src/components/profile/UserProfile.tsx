import backImage from '@/assets/profile-back.webp'
import { useAuth } from '@/AuthContext'
import profilePagesData from '@/data/profilePagesData'
import useSignout from '@/hooks/useSignout'
import useLanguageStore from '@/stores/languageStore'
import { Avatar, Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserCredit from './UserCredit'

const UserProfile = () => {
  const lang = useLanguageStore(s => s.language)
  const buttons = lang === 'en' ? profilePagesData.en : profilePagesData.zh

  const location = useLocation()
  const isProfileMePage = location.pathname.startsWith('/profile/me')

  const { user, setUser } = useAuth()
  const fullName = user?.first_name || user?.last_name
    ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
    : user?.username
  const portraitUrl = user?.portrait || ''
  
  const { mutate } = useSignout()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

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

  return (
    <>
      <Box position='relative'>
        <Box height='200px' overflow='hidden'>
          <Image src={backImage} objectFit='cover'/>
        </Box>
        <Avatar
          size='large'
          position='absolute' top='135px' ml={5}
          name={fullName} src={portraitUrl}
          sx={{boxShadow: '0 0 0 5px #CBD5E0'}}
          opacity={0.95}
        />
      </Box>
      <Box px={5} py={2}>
        <Box textAlign='right'>
          <UserCredit/>
          {isProfileMePage &&
            <Button size='sm' variant='outline' onClick={handleLogout}>
              {buttons.logout}
            </Button>}
          {!isProfileMePage && <Link to='/profile/me'>
            <Button size='sm' variant='solid'>
              {buttons.edit}
            </Button>
          </Link>}
        </Box>
        <Heading fontSize='3xl'>
          {fullName}
        </Heading>
        <Text fontSize='lg' color='gray.300' pb={3}>
          {`@${user?.username}`}
        </Text>
      </Box>
    </>
  )
}

export default UserProfile