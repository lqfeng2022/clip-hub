import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { RefObject } from 'react'
import { parseTimeline, sortExpressionsByTimeline } from '@/helperfunction'
import ExpressionCardTimeline from '../expression/ExpressionCardTimeline'
import useClipExpressions from '@/hooks/store/useClipExpressions'

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

  return (
    <Box py={0}>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem border='none'>
          <AccordionButton px='0'>
            <Box as='span' flex='1' textAlign='left'>
              <Heading size='md' color='gray'>
                Clip expressions
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={2} pb={0}>
            <SimpleGrid
              columns={2}
              pt='10px'
              pb={0}
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default ClipExpressionTimeline