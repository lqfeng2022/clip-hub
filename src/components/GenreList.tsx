import { List, ListItem, HStack, Image, Spinner, Button, Heading } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';

// add a new props to notify parent: 'hey, I chose a genre'
interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenreId: number;
}
const GenreList = ({onSelectGenre, selectedGenreId}: Props) => {
  const {data, error, isLoading} = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data?.results.map((genre) => (
          <ListItem paddingY='6px' key={genre.id}>
            <HStack>
              <Image
                boxSize='48px'
                objectFit='cover'
                borderRadius={8}
                src={genre.image}
              />
              <Button
                whiteSpace='normal'
                textAlign='left'
                fontWeight={
                  genre.id === selectedGenreId ? 'bold' : 'normal'
                }
                onClick={() => onSelectGenre(genre)}
                fontSize='lg'
                variant='link'
              >
                {genre.title}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;