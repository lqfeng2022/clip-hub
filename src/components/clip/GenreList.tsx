import {
  AspectRatio, Box, Button, Divider, Heading, HStack, Image, List, 
  ListItem, Spinner 
} from '@chakra-ui/react'
import useClipQueryStore from '@/clipStore'
import useGenres from '@/hooks/store/useGenres'

const GenreList = () => {
  const selectedGenreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const setSelectedGenreId = useClipQueryStore((s) => s.setGenreId)

  const { data, error, isLoading } = useGenres()

  if (error) return null
  if (isLoading) return <Spinner />
  return (
    <Box mt={8}>
      <Divider my={3} borderColor='white'/>
      <Heading fontSize='3xl' pb={3}>
        Clip genres
      </Heading>
      <List>
        {data?.results.map((genre) => (
          <ListItem py='6px' key={genre.id}>
            <HStack spacing={4}>
              <AspectRatio w='70px' ratio={9 / 6}>
                <Image
                  objectFit='cover'
                  borderRadius={5}
                  src={genre.image}
                  alt={genre.title}
                />
              </AspectRatio>
              <Button
                whiteSpace='normal'
                textAlign='left'
                fontWeight={
                  genre.id === selectedGenreId ? 'bold' : 'normal'
                }
                onClick={() => setSelectedGenreId(genre.id)}
                fontSize='md'
                variant='link'
                _hover={{textDecoration: 'none'}}
              >
                {genre.title}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default GenreList