import { Heading, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useClip from '../hooks/useClip';

// shotcut: `rafce`
const ClipDetailPage = () => {
  const { slug } = useParams(); // get `slug` from url
  const { data: clip, isLoading, error } = useClip(slug!);

  if (isLoading) return <Spinner/>;
  if (error || !clip) throw error; 
  return (
    <div>
      <Heading>{clip.title}</Heading>
      <Text>{clip.description}</Text>
    </div>
  );
};

export default ClipDetailPage