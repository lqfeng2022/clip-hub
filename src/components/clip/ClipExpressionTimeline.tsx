import { parseTimeline, sortExpressionsByTimeline } from '@/helperfunction'
import useClipExpressions from '@/hooks/store/useClipExpressions'
import useLanguageStore from '@/languageStore'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { RefObject } from 'react'
import ExpressionCardTimeline from '../expression/ExpressionCardTimeline'

interface Props {
  clipId: number,
  videoRef: RefObject<HTMLVideoElement>
}
const ClipExpressionTimeline = ({ clipId, videoRef }: Props) => {
  const { data: clipEp } = useClipExpressions(clipId)
  // throw runtime error issue: 'data is not iterable'
  // even we use `!` fo force TS to trust you that it's not-null, but it won't prevent actual runtime error...
  // cus clipEp could be undefined before the fetching
  const sortedData = clipEp?.results 
    ? sortExpressionsByTimeline(clipEp.results) 
    : []

  const handleSeek = (timeline: string) => {
    const seconds = parseTimeline(timeline)
    if (videoRef.current) {
      videoRef.current.currentTime = seconds
      videoRef.current.play()
    }
  }

  const lang = useLanguageStore(s => s.language)
  const heading = lang === 'en' ? 'Clip expressions' : '视频中的表达式'

  return (
    <>
      <Box as='span' flex='1' textAlign='left'>
        <Heading size='md' color='gray'>
          {heading}
        </Heading>
      </Box>
      <SimpleGrid
        columns={2}
        pt='15px'
        spacing={3}
      >
        {sortedData?.map((e) => (
          <ExpressionCardTimeline
            key={e.id}
            expression={e}
            handleJump={() => handleSeek(e.timeline)}
          />
        ))}
      </SimpleGrid>
    </>
  )
}

export default ClipExpressionTimeline