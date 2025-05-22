import { Movie } from '../entities/Movie';

interface Props {
  movie: Movie;
}
const ClipMovie = ({ movie }: Props) => {
  return (
    <video src={movie.clip} poster={movie.preview} controls />
  )
}

export default ClipMovie