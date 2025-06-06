import { Box, Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SimpleClipCardWithMark from '../components/SimpleClipCardWithMark'
import useClipLike from '../hooks/useClipLike'
import useClipLikes from '../hooks/useClipLikes'

const ProfileLikePage = () => {
  const { data, refetch, error, fetchNextPage,  hasNextPage } = useClipLikes()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0
  ) || 0

  const { mutate: updateLike } = useClipLike()
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
        Your liked clips
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
                .filter((like) => like.visible)
                .map((like) => (
                  <Box key={like.id}>
                    <SimpleClipCardWithMark 
                      clip={like.video}
                      handleClick={() => handleUpdate(
                        like.id, !like.visible
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

export default ProfileLikePage