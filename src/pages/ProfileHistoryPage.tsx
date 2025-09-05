import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useExpressionViews from '../hooks/interact/useExpressionViews'
import useViewHistory from '../hooks/interact/useViewHistory'
import useLanguageStore from '@/languageStore'
import ExpressionCardDeleteMark from '@/components/profile/ExpressionCardDeleteMark'
import BeatLoader from '@/components/BeatLoader'

const ProfileHistoryPage = () => {
  const lang = useLanguageStore(s => s.language)

  const { data, refetch, error, fetchNextPage,  hasNextPage } = useExpressionViews()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  const { mutate: updateViewHistory } = useViewHistory()
  const handleUpdate = (id: number, visible: boolean) => {
    updateViewHistory(
      { id, visible }, 
      { onSuccess: () => refetch() }
    )
  }

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <Heading m={4} fontSize='3xl'>
        {lang === 'en' ? 'View history' : '你的浏览记录'}
      </Heading>
      <InfiniteScroll
        dataLength={fetchExpressionsCount}
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
              {page?.results
                .filter((history) => history.visible)
                .map((history) => (
                  <Box key={history.id}>
                    <ExpressionCardDeleteMark
                      expression={history.expression}
                      handleClick={() => handleUpdate(
                        history.id, !history.visible
                      )}
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

export default ProfileHistoryPage