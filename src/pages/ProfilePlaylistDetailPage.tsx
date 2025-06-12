import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import useList from '../hooks/useList'
import useListItemDelete from '../hooks/interact/useListItemDelete'
import ClipCardWithDeleteMark from '../components/profile/ClipCardWithDeleteMark'

const ProfilePlaylistDetailPage = () => {
  const { slug } = useParams()
  const { data, refetch } = useList(slug!)

  const { mutate: listItemDelete } = useListItemDelete()
  const handleDelteList = (listId: number, listItemId: number) => { 
    listItemDelete(
      { listId, listItemId }, 
      { onSuccess: () => refetch() }
    )
  }

  return (
    <div>
      <Heading m={4} fontSize='3xl'>
        {`Playlist - ${data?.title}`}
      </Heading>
      <SimpleGrid
        columns={{ base: 2, lg: 3, xl: 4 }}
        p='10px'
        spacing={3}
      >
        {data?.items.map((item) => (
          <Box key={item.id}>
            <ClipCardWithDeleteMark 
              clip={item.video}
              handleClick={() => handleDelteList(
                data.id, item.id
              )}
            />
          </Box>
        ))}
      </SimpleGrid>
    </div>
  )
}

export default ProfilePlaylistDetailPage