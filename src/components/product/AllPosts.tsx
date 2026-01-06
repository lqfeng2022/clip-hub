import BeatLoader from '@/components/BeatLoader'
import ExpressionCard from '@/components/product/ExpressionCard'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SubtitleCard from './SubtitleCard'
import VideoCard from './VideoCard'
import useSearchProducts from '@/hooks/store/useSearchProducts'
import PostCount from './PostCount'

const AllPosts = () => {
  const { 
    data, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isLoading 
  } = useSearchProducts()

  const fetchCount = data?.pages.reduce(
    (sum, page) => sum + page.results.length, 0) || 0

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
        <SimpleGrid pb='200px'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((prod) =>
                <Box key={prod.id}>
                  {prod.type === 'expression' &&
                    <ExpressionCard product={prod}/>}
                  {prod.type === 'subtitle' &&
                    <SubtitleCard product={prod}/>}
                  {prod.type === 'video' &&
                    <VideoCard product={prod}/>}
                </Box>
              )}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default AllPosts