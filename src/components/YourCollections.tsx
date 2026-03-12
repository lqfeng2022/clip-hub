import BeatLoader from '@/components/BeatLoader'
import PostCount from '@/components/product/PostCount'
import useListDelete from '@/hooks/interact-list/useListDelete'
import useListUpdate from '@/hooks/interact-list/useListPut'
import useLists from '@/hooks/interact-list/useLists'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CollectionCard from './collection/CollectionCard'

const YourCollections = () => {
  const { data, error, fetchNextPage,  hasNextPage } = useLists()
  const fetchCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  const { mutate: updateList } = useListUpdate()
  const handleUpdateList = (listId: number, title: string) => {
    updateList({ listId, title })
  }

  const { mutate: deleteList } = useListDelete()
  const handleDelteList = (listId: number) => {
    deleteList({listId})
  }

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <PostCount count={fetchCount} genre='collections'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid pl={4} py={8} gap={6}>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((list) => (
                <Box key={list.id}>
                  <CollectionCard
                    list={list}
                    onDelete={() => handleDelteList(list.id)}
                    onUpdate={(title) => { 
                      handleUpdateList(list.id, title) 
                    }}
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

export default YourCollections