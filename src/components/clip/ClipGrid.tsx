import { SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useClips from '../../hooks/useClips'
import ClipCardContainer from '../ClipCardContainer'
import ClipCard from './ClipCard'
import ClipCardSkeleton from '../ClipCardSkeleton'

const ClipGrid = () => {
  const {
    data, 
    error, 
    isLoading, 
    isFetchingNextPage, 
    fetchNextPage, 
    hasNextPage,
  } = useClips()
  const skeletons = [1, 2, 3, 4, 5, 6]
  const fetchClipsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  // `error` -> `error.message`
  if (error) return <Text>{error.message}</Text>
  return (
    <InfiniteScroll 
      dataLength={fetchClipsCount} 
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner/>}
    >
      <SimpleGrid
        columns={{ sm: 1, lg: 2, xl: 3 }}
        padding='10px'
        spacing={3}
      >
        {isLoading &&
          skeletons.map(
            (skeleton) => (
              <ClipCardContainer key={skeleton}>
                <ClipCardSkeleton/>
              </ClipCardContainer>
          ))}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.results.map((clip) => (
                <ClipCardContainer key={clip.id} >
                  <ClipCard clip={clip} />
                </ClipCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  )
}

export default ClipGrid