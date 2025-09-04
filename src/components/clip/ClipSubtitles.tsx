import { Subtitle } from '@/entities/Subtitle'
import { parseTimeline, sortSubtitlesByTimeline } from '@/helperfunction'
import { SimpleGrid } from '@chakra-ui/react'
import { RefObject } from 'react'
import ClipSubtitleTimeline from './ClipSubtitleTimeline'

interface Props {
  subtitles: Subtitle[],
  videoRef: RefObject<HTMLVideoElement>,
}
const ClipSubtitles = ({ subtitles, videoRef }: Props) => {
  const sortedData = subtitles 
    ? sortSubtitlesByTimeline(subtitles) : []

  const handleSeek = (timeline: string) => {
    const seconds = parseTimeline(timeline)
    if (videoRef.current) {
      videoRef.current.currentTime = seconds // Jump to the target time
      videoRef.current.play()
    }
  }

  return (
      <SimpleGrid pt='15px' spacing={5}>
        {sortedData?.map((e) => (
          <ClipSubtitleTimeline
            key={e.id}
            subtitle={e}
            handleJump={() => handleSeek(e.timeline)}
          />
        ))}
      </SimpleGrid>
  )
}

export default ClipSubtitles