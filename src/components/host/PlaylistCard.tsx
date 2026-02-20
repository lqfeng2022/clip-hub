import Playlist from '@/entities/Playlist'
import { Card, CardBody, Text, HStack, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import PlaylistCardCover from './PlaylistCardCover'
import PlaylistEditMenu from './PlaylistEditMenu'

interface Props {
  list: Playlist,
  onAdd: () => void,
}
const PlaylistCard = ({ list, onAdd }: Props) => {
  return (
    <Card 
      direction='row'
      variant='unstyled' 
      borderRadius={12}
    >
      <PlaylistCardCover list={list}/>
      <CardBody pl='10px' pr='5px'>
        <HStack justifyContent='space-between' alignItems='flex-start'>
          <Stack spacing={0}>
            <Link to={`/playlist/${list.short_uuid}`} state={{list}}>
              <Text
                fontSize='sm'
                noOfLines={3}
                pt='6px'
                _hover={{ color: 'orange' }}
                cursor='pointer'
              >
                {list.title}
              </Text>
            </Link>
            {list.course && 
              <Link to={`/courses/${list.course.slug}`} >
                <Text
                  fontSize='0.8rem'
                  fontWeight='bold'
                  color='yellow.200'
                  noOfLines={2}
                  pt='6px'
                  _hover={{ color: 'orange' }}
                  cursor='pointer'
                  opacity={0.7}
                >
                  {list.course.title}
                </Text>
              </Link>
            }
          </Stack>
          <PlaylistEditMenu isSaved={false} onAdd={onAdd}/>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default PlaylistCard