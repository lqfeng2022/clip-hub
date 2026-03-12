import BeatLoader from '@/components/BeatLoader'
import PlaylistCard from '@/components/host/PlaylistCard'
import PageNavTab from '@/components/PageNavTab'
import PostCount from '@/components/product/PostCount'
import usePlaylistAdd from '@/hooks/interact-playlist/usePlaylistAdd'
import useCourse from '@/hooks/store/useCourse'
import { Box, SimpleGrid, useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

const CourseDetailPage = () => {
  const { slug } = useParams<{slug?: string}>() // we ALWAYS have slug
  const { data, isLoading  } = useCourse(slug!)
  
  const { mutate: addPlaylist } = usePlaylistAdd()
  const toast = useToast()

  const handleAddPlaylist = (playlist: string) => {
    addPlaylist({ playlist }, { 
      onSuccess: () => {
        toast({
          title: 'Playlist added.',
          description: "We've put this playlist in your collections",
          status: 'success',
          duration: 3000,
          isClosable: true,
      })
      }
    })
  }

  if (isLoading) return <BeatLoader/>

  return (
    <>
      <PageNavTab title={data!.title}/>
      <PostCount count={data!.playlist_count ?? 0} genre='Playlists'/>
      <SimpleGrid pl={4} py={8} gap={6}>
        {data!.playlists.map((list) => (
          <Box key={list.short_uuid}>
            <PlaylistCard
              list={list}
              onAdd={() => handleAddPlaylist(list.short_uuid)}
            />
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}

export default CourseDetailPage