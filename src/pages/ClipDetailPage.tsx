import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useClip from '../hooks/useClip';
import ExpandableText from '../components/ExpandableText';

const ClipDetailPage = () => {
  const { slug } = useParams(); // get `slug` from url
  const { data: clip, isLoading, error } = useClip(slug!);

  if (isLoading) return <Spinner/>;
  if (error || !clip) throw error; 
  return (
    <div>
      <Heading>{clip.title}</Heading>
      <Box py={3}>
        <Heading size='md'>About</Heading>
        <ExpandableText limit={250}>
          {clip.description}
        </ExpandableText>
      </Box>
    </div>
  );
};

export default ClipDetailPage