import BeatLoader from '@/components/BeatLoader'
import PageNavTab from '@/components/PageNavTab'
import profilePagesData from '@/data/profilePagesData'
import useBookmarks from '@/hooks/store/useBookmarks'
import useLanguageStore from '@/stores/languageStore'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ExpressionCard from '../components/product/ExpressionCard'
import SubtitleCard from '@/components/product/SubtitleCard'
import VideoCard from '@/components/product/VideoCard'
import PostCount from '@/components/product/PostCount'

const BookmarkPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? profilePagesData.en.bookmark : profilePagesData.zh.bookmark

  const { data, error, fetchNextPage,  hasNextPage } = useBookmarks()
  const fetchCount = data?.pages.reduce(
    (sum, page) => sum + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <PageNavTab title={header}/>
      <PostCount count={fetchCount} genre='Bookmarks'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results
                .map((p) => 
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

export default BookmarkPage