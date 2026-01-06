import useFollowing from '@/hooks/store/useFollowedProducts'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import BeatLoader from '../BeatLoader'
import ExpressionCard from './ExpressionCard'
import SubtitleCard from './SubtitleCard'
import VideoCard from './VideoCard'
import PostCount from './PostCount'

const FollowingPosts = () => {
  const { data, error, fetchNextPage, hasNextPage } = useFollowing()
  const postCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>

  return (
    <>
      <PostCount count={postCount} genre='Posts'/>
      <InfiniteScroll
        dataLength={postCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid>
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

export default FollowingPosts