import BeatLoader from '@/components/BeatLoader'
import PlaylistCardSaved from '@/components/host/PlaylistCardSaved'
import PostCount from '@/components/product/PostCount'
import useSavedPlaylists from '@/hooks/interact/useSavedPlaylist'
import useSavedPlaylistDelete from '@/hooks/interact/useSavedPlaylistDelete'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const SavedPlaylistPage = () => {
  const { data, error, fetchNextPage,  hasNextPage } = useSavedPlaylists()
  const fetchCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  const { mutate: deleteList } = useSavedPlaylistDelete()
  const handleDelteList = (listId: number) => {
    deleteList({listId})
  }

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <PostCount count={fetchCount} genre='Lists'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid pl={4} py={8} gap={6}>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((list) => (
                <Box key={list.id}>
                  <PlaylistCardSaved
                    list={list}
                    onDelete={() => handleDelteList(list.id)}
                  />
                </Box>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default SavedPlaylistPage