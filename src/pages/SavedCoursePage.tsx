import BeatLoader from '@/components/BeatLoader'
import CourseCardSaved from '@/components/host/CourseCardSaved'
import PostCount from '@/components/product/PostCount'
import useSavedCourses from '@/hooks/interact/useSavedCourses'
import useSavedCourseDelete from '@/hooks/interact/useSavedCourseDelete'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const SavedCoursePage = () => {
  const { data, error, fetchNextPage,  hasNextPage } = useSavedCourses()
  const fetchCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 0) || 0

  const { mutate: deleteList } = useSavedCourseDelete()
  const handleDelteList = (listId: number) => {
    deleteList({listId})
  }

  if (error) return <Text>{error.message}</Text>
  return (
    <>
      <PostCount count={fetchCount} genre='courses'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid pl={4} py={8} gap={6}>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((course) => (
                <Box key={course.id}>
                  <CourseCardSaved
                    course={course}
                    onDelete={() => handleDelteList(course.id)}
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

export default SavedCoursePage