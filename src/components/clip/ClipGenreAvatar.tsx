import Clip from '@/entities/Clip'
import { Avatar, Box, HStack, Text } from '@chakra-ui/react'

const ClipGenreAvatar = ({ clip }: { clip: Clip }) => {
  return (
    <HStack align='flex-start' wrap='wrap' spacing={4}>
      <Avatar
        size='md'
        src={clip.genre.image}
        alignSelf='flex-start'
        flexShrink={0}
      />
      <Box flex='1' minW={0}>
        <Text as='b' py={1} fontSize='lg' color='yellow.200'>
          {clip.genre.title}
        </Text>
        <Text fontSize='sm' color='gray'>356 clips</Text>
      </Box>
    </HStack>
  )
}

export default ClipGenreAvatar