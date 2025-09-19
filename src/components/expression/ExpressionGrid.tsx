import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useExpressions from '@/hooks/store/useExpressions'
import ExpressionCard from './ExpressionCard'
import BeatLoader from '../BeatLoader'

const ExpressionGrid = () => {
  const { data, error, fetchNextPage, hasNextPage } = useExpressions()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0
  ) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <InfiniteScroll 
      dataLength={fetchExpressionsCount} 
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<BeatLoader/>}
    >
      <SimpleGrid
        columns={{ sm: 2, lg: 3, xl: 4 }}
        p='10px'
        spacing={4}
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.results.map((expression) => (
                <Box key={expression.id}>
                  <ExpressionCard 
                    expression={expression} 
                  />
                </Box>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  )
}

export default ExpressionGrid