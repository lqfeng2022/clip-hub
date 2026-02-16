import BeatLoader from '@/components/BeatLoader'
import SubscribeList from '@/components/host/SubscribeList'
import PageNavTab from '@/components/PageNavTab'
import PostCount from '@/components/product/PostCount'
import profilePagesData from '@/data/profilePagesData'
import useHosts from '@/hooks/store/useHosts'
import useLanguageStore from '@/stores/languageStore'
import { Box, Divider, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const HostsPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? profilePagesData.en.host : profilePagesData.zh.host


  const { data, error, fetchNextPage,  hasNextPage } = useHosts()
  const fetchCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <PageNavTab title={header}/>
      <PostCount count={fetchCount} genre='Hosts'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid pt={5} pb='100px'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
                {page?.results.map((h) =>
                  <Box key={h.id} px={3} py={1}>
                    <SubscribeList host={h}/>
                    <Divider my={4}/>
                  </Box>
                 )}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default HostsPage