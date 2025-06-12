import { Box, Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useClipHistories from '../hooks/interact/useClipHistories'
import useClipHistory from '../hooks/interact/useClipHistory'
import ClipCardWithDeleteMark from '../components/profile/ClipCardWithDeleteMark'

const ProfileHistoryPage = () => {
  const { data, refetch, error, fetchNextPage,  hasNextPage } = useClipHistories()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  const { mutate: updateLike } = useClipHistory()
  const handleUpdate = (id: number, visible: boolean) => {
    updateLike(
      { id, visible }, 
      { onSuccess: () => refetch() }
    )
  }

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
                  <Box key={history.id}>
                    <ClipCardWithDeleteMark
                      clip={history.video}
                      handleClick={() => handleUpdate(
                        history.id, !history.visible
                      )}
                    />
                  </Box>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default ProfileHistoryPage