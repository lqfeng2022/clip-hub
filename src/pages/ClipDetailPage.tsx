import { Box, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import useClip from '../hooks/store/useClip'
import ClipExpressionTimeline from '@/components/clip/ClipExpressionTimeline'
import ClipAttributes from '../components/clip/ClipAttributes'
import ClipInteractIcons from '../components/clip/ClipInteractIcons'
import ClipMovie from '../components/clip/ClipMovie'
import CollapseText from '../components/CollapseText'

const ClipDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: clip, isLoading, error } = useClip(slug!)

  const videoRef = useRef<HTMLVideoElement>(null)

  if (isLoading) return <Spinner/>
  if (error || !clip) throw error 
  return (
    <Grid 
      templateAreas={{
        base: `'main'`,
        lg: `'left right'`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '1fr 2fr', // Left 1/3, Right 2/3
      }}
      gap={5}
      px={2}
    >
      <GridItem order={{ base: 2, lg: 1 }}>
        <Box py={3}>
          <Heading py={3}>{clip.title}</Heading>
          <Heading size='md' pb={1} color='gray.500'>
            About
          </Heading>
          <CollapseText limit={95}>
            {clip.description}
          </CollapseText>
        </Box>
        <ClipAttributes clip={clip}/>
      </GridItem>
      <GridItem order={{ base: 1, lg: 2 }}>
        <ClipMovie 
          movie={clip.movies[0]} 
          videoId={clip.id}
          videoRef={videoRef}
          />
        <ClipInteractIcons clip={clip}/>
        <ClipExpressionTimeline 
          clipId={clip.id}
          videoRef={videoRef}
        />
      </GridItem>
    </Grid>
  )
}

export default ClipDetailPage