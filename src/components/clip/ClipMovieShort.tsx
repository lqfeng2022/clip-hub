import { RefObject } from 'react'
import Movie from '@/entities/Movie'
import useInteract from '@/hooks/store/useClipInteract'
import { AspectRatio, Box } from '@chakra-ui/react'

interface Props {
  videoId: number
  movies: Movie[]
  preview: string
  videoRef: RefObject<HTMLVideoElement>
}
const ClipMovieShort = ({ videoId, movies, preview, videoRef }: Props) => {
  const { mutate } = useInteract(videoId, 'history')

  const cloudMovie = movies.find(m => m.stored_at === 'cloud') 
  const cloudSrc = cloudMovie?.clip

  const ytMovie = movies.find(y => y.stored_at === 'YT')
  const ytSrc = ytMovie?.clip
  // Only parse YouTube ID if ytSrc exists and is a valid URL
  let youtubeId: string | null = null
  if (ytSrc) {
    try {
      const url = new URL(ytSrc)

      youtubeId = new URLSearchParams(new URL(ytSrc).search).get('v')

      if (!youtubeId) {
        const paths = url.pathname.split('/').filter(Boolean)
        const last = paths[paths.length - 1]
        // YouTube video IDs are always 11 characters
        if (last && last.length === 11) youtubeId = last
      }
    } catch (error) {
      console.error('Invalid YouTube URL:', ytSrc)
    }
  }

  return (
    <>
      {!youtubeId && 
      <Box maxW='420px' mx='auto'>
        <AspectRatio ratio={9/16}>
          <video
            ref={videoRef}
            src={cloudSrc}
            poster={preview}
            controls
            onPlay={() => mutate({ visible: true })}
            /> 
        </AspectRatio>
      </Box>
      } {youtubeId && 
      <Box maxW='420px' mx='auto'>
        <AspectRatio ratio={9/16}>
          <iframe 
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title='YouTube player'
            allowFullScreen
            />
        </AspectRatio>
      </Box>
      }
    </>
  )
}

export default ClipMovieShort