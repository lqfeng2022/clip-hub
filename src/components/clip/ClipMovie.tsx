import { RefObject } from 'react'
import Movie from '@/entities/Movie'
import useInteract from '@/hooks/store/useClipInteract'
import { AspectRatio } from '@chakra-ui/react'

interface Props {
  videoId: number
  movies: Movie[]
  preview: string
  videoRef: RefObject<HTMLVideoElement>
}
const ClipMovie = ({ videoId, movies, preview, videoRef }: Props) => {
  const { mutate } = useInteract(videoId, 'history')

  const cloudMovie = movies.find(m => m.stored_at === 'cloud') 
  const cloudSrc = cloudMovie?.clip

  const ytMovie = movies.find(y => y.stored_at === 'yt')
  const ytSrc = ytMovie?.clip
  // Only parse YouTube ID if ytSrc exists and is a valid URL
  let youtubeId: string | null = null
  if (ytSrc) {
    try {
      youtubeId = new URLSearchParams(new URL(ytSrc).search).get('v')
    } catch (error) {
      console.error('Invalid YouTube URL:', ytSrc)
    }
  }

  return (
    <div>
      {!youtubeId && 
        <video
          ref={videoRef}
          src={cloudSrc}
          poster={preview}
          controls
          onPlay={() => mutate({ visible: true })}
        />
      }
      {youtubeId && 
        <AspectRatio ratio={16/9}>
          <iframe 
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title='YouTube player'
            allowFullScreen
          />
        </AspectRatio>
      }
    </div>
  )
}

export default ClipMovie