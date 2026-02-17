import BeatLoader from '@/components/BeatLoader'
import usePlaylists from '@/hooks/store/usePlaylists'
import { Box, SimpleGrid, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostCount from '../product/PostCount'
import PlaylistCard from './PlaylistCard'
import usePlaylistAdd from '@/hooks/interact/usePlaylistAdd'

const HostPlaylists = () => {
  const { data, error, fetchNextPage, hasNextPage, isLoading  } = usePlaylists()
  
  const fetchCount = data?.pages.reduce(
    (sum, page) => sum + page.results.length, 0) || 0
    
  const toast = useToast()
  
  const { mutate: addPlaylist } = usePlaylistAdd()

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
  if (error) return <Text>{error.message}</Text>

  return (
    <>
      <PostCount count={fetchCount} genre='Posts'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid  pl={4} py={8} gap={6} pb='100px'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((list) =>
                <Box key={list.short_uuid}>
                  <PlaylistCard 
                    list={list} 
                    onAdd={() => handleAddPlaylist(list.short_uuid)}
                  />
                </Box>
              )}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default HostPlaylists