import { Box, GridItem, Heading, SimpleGrid, Spinner } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import ClipAttributes from '../components/clip/ClipAttributes'
import ClipMovie from '../components/clip/ClipMovie'
import ClipExpressionList from '../components/clip/ClipExpressionList'
import ClipInteractIcons from '../components/clip/ClipInteractIcons'
import CollapseText from '../components/CollapseText'
import useClip from '../hooks/store/useClip'

const ClipDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: clip, isLoading, error } = useClip(slug!)

  if (isLoading) return <Spinner/>
  if (error || !clip) throw error 
  return (
    <>
      <SimpleGrid 
        p='15px 10px' 
        columns={{ base: 1, lg: 2 }} 
        spacing={5}
      >
        <GridItem order={{ base: 2, lg: 1 }}>
          <Heading>{clip.title}</Heading>
          <Box py={3}>
            <Heading size='md' pb={1} color='gray.500'>
              About
            </Heading>
            <CollapseText limit={95}>
              {clip.description}
            </CollapseText>
          </Box>
          <ClipAttributes clip={clip}/>
          <ClipExpressionList data={clip.expressions}/>
        </GridItem>
        <GridItem order={{ base: 1, lg: 2 }}>
          <ClipMovie 
            movie={clip.movies[0]} 
            videoId={clip.id}
          />
          <ClipInteractIcons clip={clip}/>
        </GridItem>
      </SimpleGrid>
    </>
  )
}

export default ClipDetailPage