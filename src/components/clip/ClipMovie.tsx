import { RefObject } from 'react'
import Clip from '@/entities/Clip'
import { AspectRatio, Box } from '@chakra-ui/react'

interface Props {
  video: Clip,
  videoRef: RefObject<HTMLVideoElement>
}
const ClipMovie = ({ video, videoRef }: Props) => {
  const movie = video.movies.find(m => m.stored_at === 'CLIP') 
  const movieSrc = movie?.clip

  return (
    <>
      {video.kind === 'NORMAL' ? (
        <video
          src={movieSrc}
          poster={video.cover}
          controls
          ref={videoRef}
        />) : (
        <Box maxW='420px' mx='auto'>
          <AspectRatio ratio={9/16}>
            <video
              src={movieSrc}
              poster={video.cover}
              controls
              ref={videoRef}
            /> 
          </AspectRatio>
        </Box>
      )}
    </>
  )
}

export default ClipMovie