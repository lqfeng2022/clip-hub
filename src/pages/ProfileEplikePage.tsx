import { Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useExpressionLikes from '../hooks/interact/useExpressionLikes'
import ExpressionCard from '../components/expression/ExpressionCard'
import useLanguageStore from '@/languageStore'
import BeatLoader from '@/components/BeatLoader'
import { profilePages } from '@/data/profilePages'

const ProfileEplikePage = () => {
  const lang = useLanguageStore(s => s.language)
  const header = lang === 'en' 
    ? profilePages.en.liked_expression : profilePages.zh.liked_expression

  const { data, refetch, error, fetchNextPage,  hasNextPage } = useExpressionLikes()
  const fetchExpressionsCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <Heading m={4} fontSize='3xl'>{header}</Heading>
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
              {page?.results
                .filter((eplike) => eplike.visible)
                .map((eplike) => (
                  <ExpressionCard
                    expression={eplike.expression}
                    onUnmark={() => refetch()}
                    key={eplike.id}
                  />
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default ProfileEplikePage