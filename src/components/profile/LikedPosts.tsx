import BeatLoader from '@/components/BeatLoader'
import { SimpleGrid, Text, Box } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ExpressionCard from '../product/ExpressionCard'
import useLikes from '../../hooks/store/useLikes'
import SubtitleCard from '@/components/product/SubtitleCard'
import VideoCard from '@/components/product/VideoCard'
import PostCount from '@/components/product/PostCount'

const LikedPosts = () => {
  const { data, error, fetchNextPage,  hasNextPage } = useLikes()
  const fetchCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <PostCount count={fetchCount} genre='Likes'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid>
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

export default LikedPosts