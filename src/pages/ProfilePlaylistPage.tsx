import { Box, Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PlaylistCard from '../components/profile/PlaylistCard'
import useListDelete from '../hooks/useListDelete'
import useLists from '../hooks/useLists'
import useListUpdate from '../hooks/useListUpdate'

const ProfilePlaylistPage = () => {
  const { data, refetch, error, fetchNextPage,  hasNextPage } = useLists()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0
  ) || 0

  const { mutate: updateList } = useListUpdate()
  const handleUpdateList = (listId: number, title: string) => {
    updateList({ listId, title }, { onSuccess: () => refetch() })
  }

  const { mutate: deleteList } = useListDelete()
  const handleDelteList = (listId: number) => {
    deleteList({listId}, { onSuccess: () => refetch() })
  }

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <Heading m={4} fontSize='3xl'>
        Your playlists
      </Heading>
      <InfiniteScroll
        dataLength={fetchExpressionsCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner/>}
      >
        <SimpleGrid
          columns={{ sm: 2, lg: 3, xl: 4 }}
          p='10px'
          spacing={3}
        >
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((list) => (
                <Box key={list.id}>
                  <PlaylistCard
                    list={list}
                    onDelete={() => handleDelteList(list.id)}
                    onUpdate={(title) => { 
                      handleUpdateList(list.id, title) 
                    }}
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

export default ProfilePlaylistPage