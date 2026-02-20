import SavedCourse from '@/entities/SavedCourse'
import { Card, CardBody, HStack, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import CourseCardCover from './CourseCardCover'
import PlaylistEditMenu from './PlaylistEditMenu'

interface Props {
  course: SavedCourse,
  onDelete: () => void,
}
const CourseCardSaved = ({ course, onDelete }: Props) => {
  const contentLink = `/courses/${course.course.slug}`

  return (
    <Card 
      direction='row'
      variant='unstyled' 
      borderRadius={12}
    >
      <CourseCardCover course={course.course}/>
      <CardBody pl='10px' pr='5px'>
        <HStack justifyContent='space-between' alignItems='flex-start'>
          <Stack>
            <Link to={contentLink} state={{course}}>
              <Text
                fontSize='sm'
                fontWeight='bold'
                noOfLines={3}
                pt='6px'
                _hover={{ color: 'yellow.300' }}
                cursor='pointer'
              >
                {course.course.title}
              </Text>
            </Link>
            <HStack pt='5px'>
              <Text fontSize='0.7em'>by</Text>
              <Link to={`/host/${course.course.host.slug}`} >
                <Text
                  fontSize='0.9em'
                  fontWeight='bold'
                  _hover={{ color: 'orange' }}
                  cursor='pointer'
                  opacity={0.8}
                >
                {course.course.host.name}
                </Text>
              </Link>
            </HStack>
          </Stack>
          <PlaylistEditMenu isSaved={true} onDelete={onDelete}/>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default CourseCardSaved