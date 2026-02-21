import { Card, CardBody, Text, HStack, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import PlaylistCardCover from './PlaylistCardCover'
import PlaylistEditMenu from './PlaylistEditMenu'
import SavedPlaylist from '@/entities/SavedPlaylist'

interface Props {
  list: SavedPlaylist,
  onDelete: () => void,
}
const PlaylistCardSaved = ({ list, onDelete }: Props) => {
  const contentLink = `/playlist/${list.playlist.short_uuid}`
  const course = list.playlist.course

  return (
    <Card 
      direction='row'
      variant='unstyled' 
      borderRadius={12}
    >
      <PlaylistCardCover list={list.playlist}/>
      <CardBody pl='10px' pr='5px'>
        <HStack justifyContent='space-between' alignItems='flex-start'>
          <Stack spacing={0}>
            <Link to={contentLink} state={{list}}>
              <Text
                fontSize='sm'
                noOfLines={2}
                lineHeight={1.3}
                pt='6px'
                _hover={{ color: 'orange' }}
                cursor='pointer'
              >
                {list.playlist.title}
              </Text>
            </Link>
            {course &&
              <Link to={`/courses/${course.slug}`} >
                <Text
                  pt='6px'
                  noOfLines={2}
                  lineHeight={1.3}
                  fontSize='0.7em'
                  fontWeight='bold'
                  color='yellow.200'
                  _hover={{ color: 'orange' }}
                  cursor='pointer'
                  opacity={0.7}
                >
                  {course.title}
                </Text>
              </Link>
            }
            {course &&
              <HStack pt='5px'>
                <Text fontSize='0.7em'>by</Text>
                <Link to={`/host/${course.host.slug}`} >
                  <Text
                    fontSize='0.8em'
                    fontWeight='bold'
                    _hover={{ color: 'orange' }}
                    cursor='pointer'
                    opacity={0.8}
                  >
                  {course.host.name}
                  </Text>
                </Link>
              </HStack>
            }
          </Stack>
          <PlaylistEditMenu isSaved={true} onDelete={onDelete}/>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default PlaylistCardSaved