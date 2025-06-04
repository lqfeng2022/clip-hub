import { SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useLists from '../hooks/useLists'
import ListCard from '../components/ListCard'

const ProfilePlaylistPage = () => {
  const { data, error, fetchNextPage,  hasNextPage } = useLists()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0
  ) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <InfiniteScroll 
      dataLength={fetchExpressionsCount} 
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner/>}
    >
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        p='10px'
        spacing={3}
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.results
              .map((list) => (
                <ListCard list={list} key={list.id}/>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  )
}

export default ProfilePlaylistPage