import { Box, Button, Center, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react'
import User from '../../entities/User'
import nocontent from '../../assets/no-content.png'

const ProfilePortrait = ({ user }: { user: User }) => {
  return (
    <Box mb={5}>
      <Heading fontSize='lg'>Portrait</Heading>
      <Text py={2}>
        Your profile picture will appear where your channel is presented on YouTube, like next to your videos and comments
      </Text>
      <HStack gap={4}>
        <Center
          width='200px'
          height='160px'
          borderRadius={5}
          bg='gray.500'
        >
          <Image
            borderRadius='full'
            objectFit='cover'
            width='100%'
            boxSize='160px'
            src={user.portrait ?? nocontent}
          />
          </Center>
        <Stack gap={4} alignSelf='flex-start'>
          <Button size='sm' colorScheme='gray' variant='outline'>
            Change
          </Button>
          <Button size='sm' colorScheme='gray' variant='outline'>
            Remove
          </Button>
        </Stack>
      </HStack>
    </Box>
  )
}

export default ProfilePortrait