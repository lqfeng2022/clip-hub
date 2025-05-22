import { 
  AspectRatio, 
  Box, 
  Button, 
  Heading, 
  HStack, 
  Image, 
  List, 
  ListItem, 
  Spinner 
} from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import useClipQueryStore from '../store';

const GenreList = () => {
  const {data, error, isLoading} = useGenres();
  const selectedGenreId = useClipQueryStore((s) => s.clipQuery.genreId)
  const setSelectedGenreId = useClipQueryStore((s) => s.setGenreId)

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <Box mt={8}>
      <Heading fontSize='2xl' mb={3}>
        Genres
      </Heading>
      <List>
        {data?.results.map((genre) => (
          <ListItem py='6px' key={genre.id}>
            <HStack>
              <AspectRatio w='80px' ratio={9 / 6}>
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
                fontSize='lg'
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
  );
};

export default GenreList;