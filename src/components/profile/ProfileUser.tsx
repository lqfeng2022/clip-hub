import { Avatar, Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import { FaBloggerB, FaRegUser } from 'react-icons/fa'
import useProfile from '../../hooks/useProfile'
import useSignout from '../../hooks/useSignout'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

const ProfileUser = () => {
  const { data: user, error } = useProfile()
  const { mutate } = useSignout()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    // `undefined`: make React Query happy, cus here we don't pass any data
    // ``: React Query lifecycle callback that fires after the mutation completes successfully
    mutate(undefined, {
      onSuccess: () => {
        queryClient.removeQueries(['profile']) // clears user
        navigate('/')
        window.location.reload() // clear auth context
      }
    })
  }

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={3}>
      <HStack align='flex-start' wrap='wrap' spacing={4}>
        <Avatar
          size='xl'
          fontWeight='bold'
          name={`${user?.first_name} ${user?.last_name}`}
          src=''
        />
        <Box flex='1'>
          <Heading fontSize='4xl'>
            {`${user?.first_name} ${user?.last_name}`}
          </Heading>
          <Text fontSize='lg' color='gray.300'>
            {`@${user?.username}`}
          </Text>
          <HStack py={2} justifyContent='space-between'>
            <HStack  gap={5} >
              <Button leftIcon={<FaRegUser/>} colorScheme='gray' size='sm'>
                View Profile
              </Button>
              <Button leftIcon={<FaBloggerB/>} colorScheme='gray' size='sm'>
                Be a Bro
              </Button>
            </HStack>
            <Button 
              size='sm' 
              color='gray' 
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