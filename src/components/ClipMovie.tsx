import { Movie } from '../entities/Movie';
import useInteract from '../hooks/useInteract';

interface Props {
  movie: Movie;
  videoId: number;
};
const ClipMovie = ({ movie, videoId }: Props) => {
  const { mutate } = useInteract(videoId, 'history');

  return (
    <video 
      src={movie.clip} 
      poster={movie.preview} 
      controls
      onPlay={() => mutate({ visible: true })}
    />
  )
};

export default ClipMovie;