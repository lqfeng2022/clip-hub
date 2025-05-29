import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useExpressions from '../hooks/useExpressions'
import CardContainer from './CardContainer'
import ClipCardSkeleton from './ClipCardSkeleton'
import ExpressionItem from './ExpressionItem'

const ExpressionGrid = () => {
  const {
    data, 
    error, 
    isLoading, 
    isFetchingNextPage, 
    fetchNextPage, 
    hasNextPage,
  } = useExpressions()
  const skeletons = [1, 2, 3, 4, 5, 6]
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
        columns={{ sm: 2, lg: 4, xl: 5 }}
        py='10px'
        spacing={3}
      >
        {isLoading &&
          skeletons.map(
            (skeleton) => (
              <CardContainer key={skeleton}>
                <ClipCardSkeleton/>
              </CardContainer>
          ))}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.results.map((expression) => (
                <Box key={expression.id} mb={5}>
                  <ExpressionItem 
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