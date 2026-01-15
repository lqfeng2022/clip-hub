import { useAuth } from '@/AuthContext'
import { Avatar, Box, Heading, Stack, Text } from '@chakra-ui/react'

const UserAvatarTop = () => {
    const { user } = useAuth()
    // ??: a simple way of ternary operator, if it's true, return the left..
    const fullName = user?.first_name || user?.last_name
      ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
      : user?.username
  
  return (
    <Stack gap={3} px={4} py={3} mt={4}>
      <Avatar
        fontWeight='semibold'
        name={fullName} 
        src={user?.portrait ?? ''} 
        opacity={0.8}
      />
      <Box>
        <Heading size='md'>{fullName}</Heading>
        <Text color='gray' fontSize='sm'>@{user?.username}</Text>
      </Box>
    </Stack>
  )
}

export default UserAvatarTop