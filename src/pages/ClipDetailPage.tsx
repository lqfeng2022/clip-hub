import ClipSubtitles from '@/components/clip/ClipSubtitles'
import useLanguageStore from '@/languageStore'
import { Box, Grid, GridItem, Heading, Spinner, Text } from '@chakra-ui/react'
import { useRef } from 'react'
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

  if (isLoading) return <Spinner/>
  if (error || !clip) throw error 
  return (
    <Grid
      templateAreas={{ base: `'main'`, lg: `'left right'` }}
      templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
      gap={5}
      px={2}
      pb='50px'
    >
      <GridItem order={{ base: 2, lg: 1 }}>
        <ClipSubtitles subtitles={clip.subtitles} videoRef={videoRef}/>
      </GridItem>
      <GridItem order={{ base: 1, lg: 2 }}>
        <ClipMovie video={clip} videoRef={videoRef}/>
        <Heading py={3}>{header}</Heading>
        <Box py={2}>
          <Heading size='md' pb={1} color='gray.500'>
            {about}
          </Heading>
          <Text>
            {about_content}
          </Text>
        </Box>
        <ClipAttributes clip={clip}/>
      </GridItem>
    </Grid>
  )
}

export default ClipDetailPage