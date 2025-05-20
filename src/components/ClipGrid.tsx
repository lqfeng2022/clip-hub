import { SimpleGrid, Text } from '@chakra-ui/react';
import useClips from '../hooks/useClips'
import GameCard from './ClipCard';
import ClipCardSkeleton from './ClipCardSkeleton';
import CardContainer from './CardContainer';
import { Genre } from '../hooks/useGenres';

interface Props {
  selectedGenre: Genre | null
}

const ClipGrid = ({selectedGenre}: Props) => {
  const {data, error, isLoading} = useClips(selectedGenre);
  const skeletons = [1, 2, 3, 4, 5, 6]

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding='10px'
        spacing={3}
      >
        {isLoading && 
          skeletons.map(
            (skeleton) => (
              <CardContainer key={skeleton}>
                <ClipCardSkeleton/>
              </CardContainer>
          ))}
        {data.map((clip) => (
            <CardContainer key={clip.id} >
              <GameCard clip={clip} />
            </CardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ClipGrid;