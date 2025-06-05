import { Heading, SimpleGrid } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import SimpleClipCard from '../components/SimpleClipCard'
import useList from '../hooks/useList'

const ProfilePlaylistDetailPage = () => {
  const { slug } = useParams()
  const { data } = useList(slug!)

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
          <SimpleClipCard key={item.id} clip={item.video}/>
        ))}
      </SimpleGrid>
    </div>
  )
}

export default ProfilePlaylistDetailPage