import { Box, Center, GridItem, Heading, Image, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import useExpression from '../hooks/store/useExpression'
import useClipExpressions from '../hooks/store/useClipExpressions'
import ExpressionBookmark from '../components/expression/ExpressionBookmark'
import ExpressionRecommend from '../components/ExpressionRecommend'
import ExpressionAttributes from './ExpressionAttributes'
import noImage from '@/assets/no-image.jpg'

const ExpressionDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: exp, isLoading, error } = useExpression(slug!)

  const videoId = exp?.video?.id
  const { data: clipexp } = useClipExpressions(videoId)
  
  if (!slug) return <Text>No slug found</Text>
  if (isLoading) return <Spinner/>
  if (error || !exp) throw error 
  return (
    <>
      <SimpleGrid
        p='15px 10px'
        columns={{ base: 1, lg: 2 }}
        spacing={5}
        >
          <GridItem order={{ base: 2, lg: 1 }}>
            <Heading pb={5} fontSize='5xl' lineHeight={1}>
              {exp.title}
            </Heading>
            <ExpressionAttributes expression={exp}/>
          </GridItem>
          <GridItem order={{ base: 1, lg: 2 }}>
            <Center>
              <Box position='relative'>
                <Image 
                  w='100%' 
                  maxH='600px' 
                  objectFit='cover' 
                  src={exp.image || noImage} 
                />
                <ExpressionBookmark expression={exp} />
              </Box>
            </Center>
          </GridItem>
      </SimpleGrid>
      <ExpressionRecommend 
        // pass `[]` until it's ready, avoid runtime crashes
        data={clipexp?.results ?? []} 
        ep={exp}
      />
    </>
  )
}

export default ExpressionDetailPage