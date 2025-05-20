import { List, ListItem, HStack, Image, Spinner, Button } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';

// add a new props to notify parent: 'hey, I chose a genre'
interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}
const GenreList = ({onSelectGenre, selectedGenre}: Props) => {
  const {data, error, isLoading} = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <List>
      {data.map((genre) => (
        <ListItem paddingY='6px' key={genre.id}>
          <HStack>
            <Image
              boxSize='32px'
              borderRadius={8}
              src={genre.image}
            />
            <Button
              fontWeight={genre.id === selectedGenre?.id 
                ? 'bold' : 'normal'}
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
  );
};

export default GenreList;