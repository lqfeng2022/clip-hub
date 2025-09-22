import useListDelete from '@/hooks/interact/useListDelete'
import useLists from '@/hooks/interact/useLists'
import useListUpdate from '@/hooks/interact/useListUpdate'
import useLanguageStore from '@/languageStore'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ExpressionListCard from '../components/profile/ExpressionListCard'
import BeatLoader from '@/components/BeatLoader'
import { profilePages } from '@/data/profilePages'

const ProfileListsPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? profilePages.en.your_lists : profilePages.zh.your_lists

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
    <>
      <Heading m={4} fontSize='3xl'>
        {header}
      </Heading>
      <InfiniteScroll
        dataLength={fetchExpressionsCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
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
    </>
  )
}

export default ProfileListsPage