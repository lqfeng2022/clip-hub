import { Avatar, Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import { FaBloggerB, FaRegUser } from 'react-icons/fa'
import useProfile from '../../hooks/useProfile'

const ProfileUser = () => {
  const { data: user, error } = useProfile()

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
        <Box>
          <Heading fontSize='4xl'>
            {`${user?.first_name} ${user?.last_name}`}
          </Heading>
          <Text fontSize='lg' color='gray.300'>
            {`@${user?.username}`}
          </Text>
          <HStack gap={5} py={2}>
            <Button leftIcon={<FaRegUser/>} colorScheme='gray' size='md'>
              View Profile
            </Button>
            <Button leftIcon={<FaBloggerB/>} colorScheme='gray' size='md'>
              Be a Bro
            </Button>
          </HStack>
        </Box>
      </HStack>
    </Box>
  )
}

export default ProfileUser