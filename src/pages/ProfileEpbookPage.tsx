import { Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ExpressionCard from '../components/ExpressionCard'
import useEpbooks from '../hooks/useEpbooks'

const ProfileEpbookPage = () => {
  const { data, refetch, error, fetchNextPage,  hasNextPage } = useEpbooks()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0
  ) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <Heading m={4} fontSize='3xl'>
        Your expressions
      </Heading>
      <InfiniteScroll
        dataLength={fetchExpressionsCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner/>}
      >
        <SimpleGrid
          columns={{ sm: 2, lg: 3, xl: 4 }}
          p='10px'
          spacing={3}
        >
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results
                .filter((epbook) => epbook.visible)
                .map((epbook) => (
                  <ExpressionCard
                    expression={epbook.expression}
                    onUnmark={() => refetch()}
                    key={epbook.id}
                  />
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default ProfileEpbookPage