import BeatLoader from '@/components/BeatLoader'
import ExpressionCard from '@/components/product/ExpressionCard'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useProductsViewed from '../../hooks/store/useProductsViewed'
import SubtitleCard from '../product/SubtitleCard'
import VideoCard from '../product/VideoCard'
import PostCount from '../product/PostCount'

const ViewHistories = () => {
  const { data, error, fetchNextPage,  hasNextPage } = useProductsViewed()
  const fetchCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <PostCount count={fetchCount} genre='View Histories'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid pb='200px'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
                {page?.results.map((p) =>
                  <Box key={p.id}>
                    {p.type === 'expression' &&
                      <ExpressionCard product={p}/>}
                    {p.type === 'subtitle' &&
                      <SubtitleCard product={p}/>}
                    {p.type === 'video' &&
                      <VideoCard product={p}/>}
                  </Box>
                 )}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default ViewHistories