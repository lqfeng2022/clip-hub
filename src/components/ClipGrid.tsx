import { SimpleGrid, Text } from '@chakra-ui/react';
import useClips from '../hooks/useClips'
import GameCard from './ClipCard';
import ClipCardSkeleton from './ClipCardSkeleton';


const ClipGrid = () => {
  const { clips, error, isLoading } = useClips();
  const skeletons = [1, 2, 3, 4, 5, 6]

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={10}
        spacing={10}
      >
        {isLoading && 
          skeletons.map(
            (skeleton) => <ClipCardSkeleton key={skeleton}/>)}
        {clips.map((clip) => (
          <GameCard key={clip.id} clip={clip} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ClipGrid;