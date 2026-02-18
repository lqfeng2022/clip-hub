import SavedCourse from '@/entities/SavedCourse'
import { Card, CardBody, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import CourseCardCover from './CourseCardCover'
import PlaylistEditMenu from './PlaylistEditMenu'

interface Props {
  course: SavedCourse,
  onDelete: () => void,
}
const CourseCardSaved = ({ course, onDelete }: Props) => {
  const contentLink = `/profile/courses/${course.course.slug}`

  return (
    <Card 
      direction='row'
      variant='unstyled' 
      borderRadius={12}
    >
      <CourseCardCover course={course.course}/>
      <CardBody pl='10px' pr='5px'>
        <HStack justifyContent='space-between' alignItems='flex-start'>
          <Link to={contentLink} state={{course}}>
            <Text
              fontSize='sm'
              noOfLines={3}
              pt='6px'
              _hover={{ color: 'yellow.300' }}
              cursor='pointer'
            >
              {course.course.title}
            </Text>
          </Link>
          <PlaylistEditMenu isSaved={true} onDelete={onDelete}/>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default CourseCardSaved