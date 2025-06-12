import { RefObject } from 'react'
import Movie from '@/entities/Movie'
import useInteract from '@/hooks/store/useClipInteract'

interface Props {
  movie: Movie
  videoId: number
  videoRef: RefObject<HTMLVideoElement>
}
const ClipMovie = ({ movie, videoId, videoRef }: Props) => {
  const { mutate } = useInteract(videoId, 'history')

  return (
    <video 
      ref={videoRef}
      src={movie.clip} 
      poster={movie.preview} 
      controls
      onPlay={() => mutate({ visible: true })}
    />
  )
}

export default ClipMovie