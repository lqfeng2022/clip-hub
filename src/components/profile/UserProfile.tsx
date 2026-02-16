import { useAuth } from '@/AuthContext'
import profilePagesData from '@/data/profilePagesData'
import useSignout from '@/hooks/useSignout'
import useLanguageStore from '@/stores/languageStore'
import { Avatar, Box, Button, Heading, Text, Image } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserCredit from './UserCredit'
import backImage from '@/assets/words-art-001.jpg'

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
      {/* user back image, avatar and credit bar */}
      <Box position='relative'>
        <Box h='200px' overflow='hidden'>
          <Image 
            h='200px' 
            w='100%' 
            src={backImage} 
            objectFit='cover' 
            opacity={0.6}
          />
        </Box>
        <Avatar
          size='large'
          position='absolute' 
          top='160px' 
          ml={5}
          name={fullName} 
          src={portraitUrl}
          sx={{boxShadow: '0 0 0 4px #CBD5E0'}}
          opacity={0.95}
        />
        <Box width='100%' position='absolute' top='0px'>
          <UserCredit/>
        </Box>
      </Box>
      {/* user edit button and personal info */}
      <Box px={5} pt={3}>
        <Box pb={7} textAlign='right'>
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
        <Heading fontSize='xl'>
          {fullName}
        </Heading>
        <Text fontSize='sm' color='gray.300' pb={2}>
          {`@${user?.username}`}
        </Text>
        <Text fontSize='sm' fontWeight='semibold' color='gray.200' pb={2}>
          {user?.description}
        </Text>
      </Box>
    </>
  )
}

export default UserProfile