import { SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useClips from '@/hooks/store/useClips'
import ClipCard from './ClipCard'
import ClipCardSkeleton from './ClipCardSkeleton'
import BeatLoader from '../BeatLoader'

const ClipGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useClips()
  const skeletons = [1, 2, 3, 4, 5, 6]
  const fetchClipsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <InfiniteScroll 
      dataLength={fetchClipsCount} 
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<BeatLoader/>}
    >
      <SimpleGrid
        columns={{ sm: 1, md: 2, xl: 3 }}
        p='10px'
        spacing={3}
      >
        {isLoading && skeletons.map(
          (skeleton) => (
            <ClipCardSkeleton key={skeleton}/>
        ))}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.results.map((clip) => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  )
}

export default ClipGrid