import { Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SimpleClipCard from '../components/SimpleClipCard'
import useClipLikes from '../hooks/useClipLikes'

const ProfileLikePage = () => {
  const { data, error, fetchNextPage,  hasNextPage } = useClipLikes()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0
  ) || 0

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
                  <SimpleClipCard clip={like.video} key={like.id}/>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default ProfileLikePage