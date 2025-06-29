import ClipExpressionTimeline from '@/components/clip/ClipExpressionTimeline'
import ClipGenreAvatar from '@/components/clip/ClipGenreAvatar'
import { Box, Grid, GridItem, Heading, Spinner, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import ClipAttributes from '../components/clip/ClipAttributes'
import ClipInteractIcons from '../components/clip/ClipInteractIcons'
import ClipMovie from '../components/clip/ClipMovie'
import useClip from '../hooks/store/useClip'
import ClipMovieShort from '@/components/clip/ClipMovieShort'

const ClipDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: clip, isLoading, error } = useClip(slug!)

  const videoRef = useRef<HTMLVideoElement>(null)

  if (isLoading) return <Spinner/>
  if (error || !clip) throw error 
  return (
    <Grid 
      templateAreas={{ base: `'main'`, lg: `'left right'` }}
      templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
      gap={5}
      px={2}
    >
      <GridItem order={{ base: 2, lg: 1 }}>
        <ClipExpressionTimeline 
          clipId={clip.id}
          videoRef={videoRef}
        />
      </GridItem>
      <GridItem order={{ base: 1, lg: 2 }}>
        {clip.type === 'NORMAL' && <ClipMovie 
          movies={clip.movies} 
          preview={clip.cover}
          videoId={clip.id}
          videoRef={videoRef}
          />
        } {clip.type === 'SHORT' && <ClipMovieShort
          movies={clip.movies}
          preview={clip.cover}
          videoId={clip.id}
          videoRef={videoRef}
          />
        }
        <Heading py={3}>{clip.title}</Heading>
        <Grid 
          templateAreas={{ base: `'main'`, md: `'left right'` }}
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={2}
        >
          <ClipGenreAvatar clip={clip}/>
          <ClipInteractIcons clip={clip}/>
        </Grid>
        <Box py={3}>
          <Heading size='md' pb={1} color='gray.500'>
            About
          </Heading>
          <Text>
            {clip.description}
          </Text>
        </Box>
        <ClipAttributes clip={clip}/>
      </GridItem>
    </Grid>
  )
}

export default ClipDetailPage