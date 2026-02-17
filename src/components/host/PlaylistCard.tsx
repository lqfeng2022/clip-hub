import Playlist from '@/entities/Playlist'
import { Card, CardBody, Text, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import PlaylistCardCover from './PlaylistCardCover'
import PlaylistEditMenu from './PlaylistEditMenu'

interface Props {
  list: Playlist,
  onAdd: () => void,
}
const PlaylistCard = ({ list, onAdd }: Props) => {
  const contentLink = `/profile/playlist/${list.short_uuid}`

  return (
    <Card 
      direction='row'
      variant='unstyled' 
      borderRadius={12}
    >
      <PlaylistCardCover list={list}/>
      <CardBody pl='10px' pr='5px'>
        <HStack justifyContent='space-between' alignItems='flex-start'>
          <Link to={contentLink} state={{list}}>
            <Text
              fontSize='sm'
              noOfLines={3}
              pt='6px'
              _hover={{ color: 'yellow.300' }}
              cursor='pointer'
            >
              {list.title}
            </Text>
          </Link>
          <PlaylistEditMenu onAdd={onAdd}/>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default PlaylistCard