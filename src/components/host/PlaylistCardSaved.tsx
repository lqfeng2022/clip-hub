import { Card, CardBody, Text, HStack } from '@chakra-ui/react'
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

  return (
    <Card 
      direction='row'
      variant='unstyled' 
      borderRadius={12}
    >
      <PlaylistCardCover list={list.playlist}/>
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
              {list.playlist.title}
            </Text>
          </Link>
          <PlaylistEditMenu isSaved={true} onDelete={onDelete}/>
        </HStack>
      </CardBody>
    </Card>
  )
}

export default PlaylistCardSaved