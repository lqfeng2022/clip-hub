import ClipSubtitles from '@/components/clip/ClipSubtitles'
import useLanguageStore from '@/languageStore'
import { Box, Button, Collapse, Grid, GridItem, Heading, HStack, Spinner, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ClipAttributes from '../components/clip/ClipAttributes'
import ClipMovie from '../components/clip/ClipMovie'
import useClip from '../hooks/store/useClip'

const ClipDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: clip, isLoading, error } = useClip(slug!)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const lang = useLanguageStore(s => s.language)
  const about = lang === 'en' ? 'About' : '简要'
  const header = lang === 'ch' && clip?.title_ch 
    ? clip?.title_ch : clip?.title
  const about_content = lang === 'ch' && clip?.description_ch 
    ? clip.description_ch : clip?.description
  const heading = lang === 'en' ? 'Subtitles' : '视频字幕'

  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)

  if (isLoading) return <Spinner/>
  if (error || !clip) throw error 
  return (
    <Grid
      templateAreas={{ base: `'main'`, lg: `'left right'` }}
      templateColumns={{ base: '1fr', lg: '3fr 2fr' }}
      gap={5}
      px={2}
      mb='50px'
    >
      {/* 2. video and subtitles */}
      <GridItem order={{ base: 2, lg: 1 }}>
        <ClipMovie video={clip} videoRef={videoRef}/>
          <Box mt={2}>
            <Box as='span' flex='1' textAlign='left'>
              <Heading size='md' py={1.5} color='gray'>
                {heading}
              </Heading>
            </Box>
            <Box flex='1' overflowY='auto' maxH='50vh'>
              <ClipSubtitles subtitles={clip.subtitles} videoRef={videoRef}/>
            </Box>
          </Box>
      </GridItem>
      {/* 1. video info */}
      <GridItem order={{ base: 1, lg: 2 }}>
        {/* 1.1 video header */}
        <Heading py={3}>{header}</Heading>
        {/* 1.2 video details */}
        <Box>
          <HStack>
            <Heading size='md' color='gray.500' mr={2}>
              {about}
            </Heading>
            {!show && <Button size='sl' variant='ghost' onClick={handleToggle}>
              ... {show ? 'less' : 'more'}
            </Button>}
          </HStack>
          <Collapse in={show}>
            <Text py={2}>{about_content}</Text>
            <ClipAttributes clip={clip}/>
          </Collapse>
          {show && <Button size='sm' mt={2} onClick={handleToggle}>
            show {show ? 'less' : 'more'}
          </Button>}
        </Box>
      </GridItem>
    </Grid>
  )
}

export default ClipDetailPage