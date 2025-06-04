import { Box, Button, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useClipLikes from '../../hooks/useClipLikes'
import SimpleClipCard from '../SimpleClipCard'

const ProfileLike = () => {
  const { data, error } = useClipLikes()
  const likes = data?.pages[0].results
    .filter((view) => view.visible)
    .slice(0, 4)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          Liked clips
        </Heading>
        <Link to='history'>
          <Button colorScheme='gray' size='sm' variant='outline'>
            View All
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        spacing={3}
      >
        {likes?.map((like) => (
            <Box key={like.id} >
              <SimpleClipCard clip={like.video} />
            </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfileLike