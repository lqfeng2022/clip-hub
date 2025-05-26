import { Avatar, Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import { FaBloggerB, FaRegUser } from 'react-icons/fa'

const ProfileUser = () => {
  return (
    <Box mt={8} px={3}>
      <HStack align='flex-start' wrap='wrap' spacing={4}>
        <Avatar
          size='2xl'
          name='Christian Nwamba'
          src='https://bit.ly/code-beast'
        />
        <Box>
          <Heading fontSize='4xl'>Bob Cooper</Heading>
          <Text fontSize='lg' color='gray.300'>
            @username
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