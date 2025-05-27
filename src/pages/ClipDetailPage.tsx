import { Box, GridItem, Heading, SimpleGrid, Spinner } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import ClipAttributes from '../components/detail/ClipAttributes'
import ExpandableText from '../components/detail/ExpandableText'
import ExpressionList from '../components/detail/ExpressionList'
import InteractIconList from '../components/detail/InteractIconList'
import useClip from '../hooks/useClip'
import ClipMovie from '../components/detail/ClipMovie'

const ClipDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: clip, isLoading, error } = useClip(slug!)

  if (isLoading) return <Spinner/>
  if (error || !clip) throw error 
  return (
    <>
      <SimpleGrid p='15px 10px' columns={{ base: 1, md: 2 }} spacing={5}>
        <GridItem>
          <Heading>{clip.title}</Heading>
          <Box py={3}>
            <Heading size='md' color='gray.500'>About</Heading>
            <ExpandableText limit={250}>
              {clip.description}
            </ExpandableText>
          </Box>
          <ClipAttributes clip={clip}/>
        </GridItem>
        <GridItem>
          <ClipMovie 
            movie={clip.movies[0]} 
            videoId={clip.id}
          />
          <InteractIconList clip={clip}/>
        </GridItem>
      </SimpleGrid>
      <ExpressionList clipId={clip.id}/>
    </>
  )
}

export default ClipDetailPage