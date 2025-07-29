import { Tag } from '@chakra-ui/react'
import { RefObject } from 'react'
import Clip from './entities/Clip'

interface Props {
  video: Clip,
  videoRef: RefObject<HTMLVideoElement>
}
const Playground = (({ video, videoRef }: Props) => {
  const movie = video.movies.find(m => m.stored_at === 'CLIP') 
  const movieSrc = movie?.clip
  // const videoRef = useRef<HTMLVideoElement>(null)
  // const [isReady, setIsReady] = useState(false)

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time // Jump to 00:45
      videoRef.current.play()
    }
    console.log('readyState:', videoRef.current?.readyState) 
  }

  return (
    <div>
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          poster={video.cover}
          controls
          ref={videoRef}
        />
      <Tag onClick={() => handleSeek(8)} py={5}>
        Seek to 00:08 & Play
      </Tag>
    </div>
  )
}
)

export default Playground