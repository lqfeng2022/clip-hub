import { Text } from '@chakra-ui/react';
import useClips from '../hooks/useClips'


const ClipGrid = () => {
  const { clips, error } = useClips();

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {clips.map((clip) => (
          <li key={clip.id}>{clip.title}</li>
        ))}
      </ul>
    </>
  );
};

export default ClipGrid;