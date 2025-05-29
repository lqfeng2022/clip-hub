import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useExpressions from '../hooks/useExpressions'
import ExpressionCard from './ExpressionCard'

const ExpressionGrid = () => {
  const {
    data, 
    error, 
    fetchNextPage, 
    hasNextPage,
  } = useExpressions()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <InfiniteScroll 
      dataLength={fetchExpressionsCount} 
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner/>}
    >
      <SimpleGrid
        columns={{ sm: 2, lg: 3, xl: 4 }}
        py='10px'
        spacing={3}
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.results.map((expression) => (
                <Box key={expression.id}>
                  <ExpressionCard 
                    expression={expression} 
                    key={expression.id} 
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