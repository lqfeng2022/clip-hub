import { useAuth } from '@/AuthContext'
import { Flex, Avatar, Box, Heading, Text, Show } from '@chakra-ui/react'

const UserAvatarBottom = () => {
    const { user } = useAuth()
    // ??: a simple way of ternary operator, if it's true, return the left..
    const fullName = user?.first_name || user?.last_name
      ? `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim()
      : user?.username
    const portrait = `https://clipwords.me/${user?.portrait}`
  
  return (
    <>
      {user && <Box style={{ marginTop: 'auto' }}>
        <Flex gap='4' px={4} py={3} my={4}>
          <Avatar
            fontWeight='semibold'
            name={fullName}
            src={portrait}
            opacity={0.9}
          />
          <Show above='xl'>
            <Box>
              <Heading size='md'>{fullName}</Heading>
              <Text color='gray'>@{user?.username}</Text>
            </Box>
          </Show>
        </Flex>
      </Box>}
    </>
  )
}

export default UserAvatarBottom