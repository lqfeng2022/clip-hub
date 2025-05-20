import { SimpleGrid, Text } from '@chakra-ui/react';
import useClips from '../hooks/useClips'
import GameCard from './ClipCard';
import ClipCardSkeleton from './ClipCardSkeleton';
import CardContainer from './CardContainer';
import { ClipQuery } from '../App';

interface Props {
  clipQuery: ClipQuery
}

const ClipGrid = ({clipQuery}: Props) => {
  const {data, error, isLoading} = useClips(clipQuery);
  const skeletons = [1, 2, 3, 4, 5, 6]

  // `error` -> `error.message`
  if (error) return <Text>{error.message}</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3 }}
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
      {data?.results.map((clip) => (
          <CardContainer key={clip.id} >
            <GameCard clip={clip} />
          </CardContainer>
      ))}
    </SimpleGrid>
  );
};

export default ClipGrid;