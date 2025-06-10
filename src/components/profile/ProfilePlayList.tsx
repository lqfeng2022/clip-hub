import { Box, Button, HStack, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useLists from '@/hooks/interact/useLists'
import SimplePlaylistCard from './PlaylistCardSimple'
import EmptyCard from '../EmptyCard'

const ProfilePlaylist = () => {
  const { data, error } = useLists()
  const lists = data?.pages[0].results.slice(0, 4)

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          Playlist
        </Heading>
        <Link to='playlist'>
          <Button 
            colorScheme='gray' 
            size='sm' 
            variant='outline'
            disabled={lists?.length === 0}
          >
            View All
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        spacing={3}
      >
        {lists?.length === 0 && <EmptyCard/>}
        {lists?.map((list) => (
          <Box key={list.id} >
            <SimplePlaylistCard list={list}/>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ProfilePlaylist