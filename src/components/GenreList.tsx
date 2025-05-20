import { List, ListItem, HStack, Image, Text, Spinner } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';


const GenreList = () => {
  const { data, error, isLoading } = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <List>
      {data.map((genre) => (
        <ListItem paddingY="6px" key={genre.id}>
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={genre.image}
            />
            <Text fontSize="lg">{genre.title}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;