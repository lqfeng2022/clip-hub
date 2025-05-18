import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { Text } from '@chakra-ui/react';

interface Clip {
  id: number;
  title: string;
}

interface FetchclipsResponse {
  count: number;
  results: Clip[];
}

const ClipGrid = () => {
  const [clips, setclips] = useState<Clip[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get<FetchclipsResponse>('/videos')
      .then((res) => setclips(res.data.results))
      .catch((err) => setError(err.message));
  }, []);

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