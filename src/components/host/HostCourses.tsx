import BeatLoader from '@/components/BeatLoader'
import { Box, SimpleGrid, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostCount from '../product/PostCount'
import useCourses from '@/hooks/store/useCourses'
import CourseCard from './CourseCard'
import useCourseAdd from '@/hooks/interact-course/useCourseAdd'

const HostCourses = () => {
  const { data, error, fetchNextPage, hasNextPage, isLoading  } = useCourses()
  
  const fetchCount = data?.pages.reduce(
    (sum, page) => sum + page.results.length, 0) || 0
    
  const toast = useToast()
  
  const { mutate: addCourse } = useCourseAdd()

  const handleAddCourse = (course: string) => {
    addCourse({ course }, { 
      onSuccess: () => {
        toast({
          title: 'Course added.',
          description: "We've put this course in your collections",
          status: 'success',
          duration: 3000,
          isClosable: true,
      })
      }
    })
  }

  if (isLoading) return <BeatLoader/>
  if (error) return <Text>{error.message}</Text>

  return (
    <>
      <PostCount count={fetchCount} genre='Courses'/>
      <InfiniteScroll
        dataLength={fetchCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<BeatLoader/>}
      >
        <SimpleGrid  pl={4} py={8} gap={6} pb='100px'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((course) =>
                <Box key={course.id}>
                  <CourseCard 
                    course={course} 
                    onAdd={() => handleAddCourse(course.slug)}
                  />
                </Box>
              )}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  )
}

export default HostCourses