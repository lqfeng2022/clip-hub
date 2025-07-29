import useListDelete from '@/hooks/interact/useListDelete'
import useLists from '@/hooks/interact/useLists'
import useListUpdate from '@/hooks/interact/useListUpdate'
import useLanguageStore from '@/languageStore'
import { Box, HStack, Heading, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ExpressionListCard from './ExpressionListCard'

const ProfileLists = () => {
  const lang = useLanguageStore(s => s.language)

  const { data, refetch, error, fetchNextPage,  hasNextPage } = useLists()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  const { mutate: updateList } = useListUpdate()
  const handleUpdateList = (listId: number, title: string) => {
    updateList({ listId, title }, { onSuccess: () => refetch() })
  }

  const { mutate: deleteList } = useListDelete()
  const handleDelteList = (listId: number) => {
    deleteList({listId}, { onSuccess: () => refetch() })
  }

  if (error) return <Text>{error.message}</Text>
  return (
    <Box mt={8} px={2}>
      <HStack justifyContent='space-between' my={5}>
        <Heading fontSize='2xl'>
          {lang === 'en' ? 'Lists' : '表达式列表'}
        </Heading>
      </HStack>
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
              {page?.results.map((list) => (
                <Box key={list.id}>
                  <ExpressionListCard
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
    </Box>
  )
}

export default ProfileLists