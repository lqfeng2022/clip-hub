import { SimpleGrid, Text } from '@chakra-ui/react';
import useClips from '../hooks/useClips'
import GameCard from './ClipCard';


const ClipGrid = () => {
  const { clips, error } = useClips();

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={10}
        spacing={10}
      >
        {clips.map((clip) => (
          <GameCard key={clip.id} clip={clip} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ClipGrid;