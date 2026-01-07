import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import ExpressionCard from '@/components/product/ExpressionCard'
import PageNavTab from '@/components/PageNavTab'
import SubtitleCard from '@/components/product/SubtitleCard'
import VideoCard from '@/components/product/VideoCard'
import useListProducts from '@/hooks/interact/useListProducts'
import { useLocation, useParams } from 'react-router-dom'
import useList from '@/hooks/interact/useList'
import BeatLoader from '@/components/BeatLoader'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostCount from '@/components/product/PostCount'

const ProfileListDetailPage = () => {
  // fetch list using slug (this will return id)
  const { slug } = useParams<{slug?: string}>() // we ALWAYS have slug
  const { data: list, isLoading: listLoading } = useList(slug!)

  // if coming from previous page, we still get list from state (optional)
  const { state } = useLocation()
  const passedList = state?.list

  // pick id priority:
  // 1. from useList (fresh from API)
  // 2. fallback to state (fast navigation)
  const listId = list?.id || passedList?.id

  // When list is not loaded yet, don't run products query
  const { data: products, error, fetchNextPage, hasNextPage } = useListProducts(
    listId!, { 
      enabled: !!listId,   // 🔥 IMPORTANT
  })

  if (listLoading) return <BeatLoader />
  if (error) return <Text>{error.message}</Text>

  const fetchCount = products?.pages.reduce(
      (total, page) => total + page.results.length, 0) || 0
  
  return (
    <>
      <PageNavTab title={`List: ${list?.title}`}/>
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

export default ProfileListDetailPage