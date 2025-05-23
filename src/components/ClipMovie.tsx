import { Movie } from '../entities/Movie';
import useHistory from '../hooks/useHistory';

interface Props {
  movie: Movie;
  videoId: number;
}
const ClipMovie = ({ movie, videoId }: Props) => {
  const { mutate } = useHistory(videoId);

  return (
    <video 
      src={movie.clip} 
      poster={movie.preview} 
      controls
      onPlay={() => mutate({visible: true})}
    />
  )
}

export default ClipMovie