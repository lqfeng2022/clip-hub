import { RefObject } from 'react'
import Clip from '@/entities/Clip'
import { AspectRatio, Box } from '@chakra-ui/react'
import { pocketURL } from '@/services/pocket'

interface Props {
  video: Clip,
  videoRef: RefObject<HTMLVideoElement>
}
const ClipMovie = ({ video, videoRef }: Props) => {
  const movieSrc = `https://clipwords.me/media/${video?.file}`

  return (
        <Box maxW='' mx='auto'>
          <AspectRatio ratio={16/9}>
            <video
              src={movieSrc}
              poster={`${pocketURL}${video.cover}`}
              ref={videoRef}
              controls
              playsInline
              autoPlay
              loop
            /> 
          </AspectRatio>
        </Box>
  )
}

export default ClipMovie