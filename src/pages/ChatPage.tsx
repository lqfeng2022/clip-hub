import BeatLoader from '@/components/BeatLoader'
import PageNavTab from '@/components/PageNavTab'
import PostCount from '@/components/product/PostCount'
import ChatSessionCard from '@/components/chat/ChatSessionCard'
import profilePagesData from '@/data/profilePagesData'
import useChatSessions from '@/hooks/interact/useChatSessions'
import useLanguageStore from '@/stores/languageStore'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ChatSessionCardTwo from '@/components/chat/ChatSessionCardTwo'

const ProfileChatPage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? profilePagesData.en.view_chat 
    : profilePagesData.zh.view_chat

  const { data, error, fetchNextPage,  hasNextPage } = useChatSessions()
  const fetchCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <PageNavTab title={header}/>
      <PostCount count={fetchCount} genre='Chat Sessions'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid my={5}>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((chat) =>
                <Box key={chat.id}>
                  {chat.product 
                  ? <ChatSessionCard chat={chat}/> 
                  : <ChatSessionCardTwo chat={chat}/>
                  }
                </Box>
              )}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default ProfileChatPage