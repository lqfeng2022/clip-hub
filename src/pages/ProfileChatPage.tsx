import BeatLoader from '@/components/BeatLoader'
import ExpressionCardChat from '@/components/profile/ExpressionCardChat'
import profilePagesData from '@/data/profilePagesData'
import useChats from '@/hooks/interact/useChats'
import useLanguageStore from '@/languageStore'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const ProfileChatPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? profilePagesData.en.view_chat : profilePagesData.zh.view_chat

  const { data, error, fetchNextPage,  hasNextPage } = useChats()
  const fetchChatSessionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <Heading m={4} fontSize='3xl'>{header}</Heading>
      <InfiniteScroll
        dataLength={fetchChatSessionsCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid
          columns={{ base: 2, lg: 3, xl: 4 }}
          p='10px'
          spacing={3}
        >
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((chat) => (
                <Box key={chat.id}>
                  <ExpressionCardChat
                    key={chat.expression.id}
                    expression={chat.expression}
                    messages={chat.messages_count}
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

export default ProfileChatPage