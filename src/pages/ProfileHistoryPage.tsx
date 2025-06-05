import { Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SimpleClipCard from '../components/SimpleClipCard'
import useClipHistories from '../hooks/useClipHistories'

const ProfileHistoryPage = () => {
  const { data, error, fetchNextPage,  hasNextPage } = useClipHistories()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0
  ) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <Heading m={4} fontSize='3xl'>
        Your view history
      </Heading>
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
                .filter((history) => history.visible)
                .map((history) => (
                  <SimpleClipCard key={history.id} clip={history.video}/>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default ProfileHistoryPage