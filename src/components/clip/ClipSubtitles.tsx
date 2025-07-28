import { Subtitle } from '@/entities/Subtitle'
import { parseTimeline, sortSubtitlesByTimeline } from '@/helperfunction'
import useLanguageStore from '@/languageStore'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { RefObject } from 'react'
import ClipSubtitleTimeline from './ClipSubtitleTimeline'


interface Props {
  subtitles: Subtitle[],
  videoRef: RefObject<HTMLVideoElement>
}
const ClipSubtitles = ({ subtitles, videoRef }: Props) => {
  const sortedData = subtitles 
    ? sortSubtitlesByTimeline(subtitles) 
    : []

  const handleSeek = (timeline: string) => {
    const seconds = parseTimeline(timeline)
    if (videoRef.current) {
      videoRef.current.currentTime = seconds
      videoRef.current.play()
    }
  }

  const lang = useLanguageStore(s => s.language)
  const heading = lang === 'en' ? 'Subtitles' : '视频字幕'

  return (
    <>
      <Box as='span' flex='1' textAlign='left'>
        <Heading size='md' color='gray'>
          {heading}
        </Heading>
      </Box>
      <SimpleGrid pt='15px' spacing={5}>
        {sortedData?.map((e) => (
          <ClipSubtitleTimeline
            key={e.id}
            subtitle={e}
            handleJump={() => handleSeek(e.timeline)}
          />
        ))}
      </SimpleGrid>
    </>
  )
}

export default ClipSubtitles