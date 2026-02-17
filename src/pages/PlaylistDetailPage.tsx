import BeatLoader from '@/components/BeatLoader'
import PageNavTab from '@/components/PageNavTab'
import ExpressionCard from '@/components/product/ExpressionCard'
import PostCount from '@/components/product/PostCount'
import SubtitleCard from '@/components/product/SubtitleCard'
import VideoCard from '@/components/product/VideoCard'
import usePlaylist from '@/hooks/store/usePlaylist'
import usePlaylistProducts from '@/hooks/store/usePlaylistProducts'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation, useParams } from 'react-router-dom'

const PlaylistDetailPage = () => {
  const { slug } = useParams<{slug?: string}>() // is short_uuid actually
  const { data: list, isLoading: listLoading } = usePlaylist(slug!)

  const { state } = useLocation()
  const passedList = state?.list

  const listId = list?.short_uuid || passedList?.id

  const { data: products, error, fetchNextPage, hasNextPage } = usePlaylistProducts(
    listId!, { enabled: !!listId })

  if (listLoading) return <BeatLoader />
  if (error) return <Text>{error.message}</Text>

  const fetchCount = products?.pages.reduce(
      (total, page) => total + page.results.length, 0) || 0
  
  return (
    <>
      <PageNavTab title={list!.title}/>
      <PostCount count={fetchCount} genre='Posts'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid>
          {products?.pages.map((page, index) => (
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

export default PlaylistDetailPage