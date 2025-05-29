import { Avatar, Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaBloggerB } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import useSignout from '../../hooks/useSignout'

const ProfileUser = () => {
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

  return (
    <Box mt={8} px={2}>
      <HStack align='flex-start' wrap='wrap' spacing={4}>
        <Avatar
          size='large'
          fontWeight='bold'
          name={fullName}
          src={user?.portrait}
        />
        <Box flex='1'>
          <Heading fontSize='4xl'>
            {`${user?.first_name} ${user?.last_name}`}
          </Heading>
          <Text fontSize='lg' color='gray.300' py={1}>
            {`@${user?.username}`}
          </Text>
          <HStack py={2} justifyContent='space-between'>
            <Button 
              leftIcon={<FaBloggerB/>} 
              size='sm' 
              disabled
            >
              Be a Bro
            </Button>
            <Button 
              size='sm' 
              variant='outline'
              onClick={handleLogout} >
              Log out
            </Button>
          </HStack>
        </Box>
      </HStack>
    </Box>
  )
}

export default ProfileUser