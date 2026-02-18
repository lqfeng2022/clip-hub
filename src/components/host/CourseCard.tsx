import Course from '@/entities/Course'
import { Card, CardBody, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import CourseCardCover from './CourseCardCover'
import PlaylistEditMenu from './PlaylistEditMenu'

interface Props {
  course: Course,
  onAdd: () => void,
}
const CourseCard = ({ course, onAdd }: Props) => {
  const contentLink = `/profile/courses/${course.slug}`

  return (
    <Card 
      direction='row'
      variant='unstyled' 
      borderRadius={12}
    >
      <CourseCardCover course={course}/>
      <CardBody pl='10px' pr='5px'>
        <HStack justifyContent='space-between' alignItems='flex-start'>
          <Link to={contentLink} state={{course}}>
            <Text
              fontSize='sm'
              fontWeight='bold'
              noOfLines={3}
              pt='6px'
              _hover={{ color: 'yellow.300' }}
              cursor='pointer'
            >
              {course.title}
            </Text>
          </Link>
          <PlaylistEditMenu isSaved={false} onAdd={onAdd}/>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default CourseCard