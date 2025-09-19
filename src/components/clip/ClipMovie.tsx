import Clip from '@/entities/Clip'
import { AspectRatio, Box } from '@chakra-ui/react'
import { pocketURL } from '@/services/pocket'

const ClipMovie = ({ video }: { video: Clip }) => {
  const movieSrc = `https://clipwords.me/media/${video?.file}`

  return (
    <Box 
      maxW={video.kind === 'SHORT' ? '350px' : ''} 
      mx='auto'
      borderRadius='xl'
      overflow='hidden'
    >
      <AspectRatio 
        ratio={video.kind === 'SHORT' ? 9/16 : 16/9}
      >
        <video
          src={movieSrc}
          poster={`${pocketURL}${video.cover}`}
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