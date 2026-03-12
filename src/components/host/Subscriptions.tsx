import BeatLoader from '@/components/BeatLoader'
import useHostsFollowed from '@/hooks/store/useHostsFollowed'
import { Box, Divider, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SubscribeList from './SubscribeList'
import PostCount from '../product/PostCount'

const Subscriptions = () => {
  const { data, error, fetchNextPage,  hasNextPage } = useHostsFollowed()
  const fetchCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <PostCount count={fetchCount} genre='Following Hosts'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid pt={5} pb='200px'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
                {page?.results.map((h) =>
                  <Box key={h.id} px={3} pb={3}>
                    <SubscribeList host={h}/>
                    <Divider my={5}/>
                  </Box>
                 )}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default Subscriptions