import { Box, Image, GridItem, Heading, HStack, Icon, SimpleGrid, Spinner, Text, Stack, Center } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import useExpression from '../hooks/useExpression'
import { ImQuotesLeft } from 'react-icons/im'
import ExpressionBookmark from '../components/expression/ExpressionBookmark'
import ClipTags from '../components/clip/ClipTags'
import ClipExpressionCards from '../components/ClipExpressionCards'
import useClipExpressions from '../hooks/useClipExpressions'

const ExpressionDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  
  const { data: exp, isLoading, error } = useExpression(slug!)

  const videoId = exp?.video?.id
  const { data: clipexp } = useClipExpressions(videoId)
  
  if (!slug) return <Text>No slug found</Text>
  if (isLoading) return <Spinner/>
  if (error || !exp) throw error 
  return (
    <div>
      <SimpleGrid
        p='15px 10px'
        columns={{ base: 1, lg: 2 }}
        spacing={5}
        >
          {/* Left section */}
          <GridItem order={{ base: 2, lg: 1 }}>
            <Heading pb={5} fontSize='5xl' lineHeight={1}>{exp.title}</Heading>
            {/* word */}
            <HStack align='flex-start' wrap='wrap'>
              <Icon as={ImQuotesLeft}/>
              <Heading fontSize='2xl' flex='1'>
                {exp.word}
              </Heading>
            </HStack>
            {/* explaining */}
            <Box py={3}>
              <Heading size='md' pb={1} color='gray.500'>
                Explain
              </Heading>
              <Text>{exp.explain}</Text>
            </Box>
            {/* language tags */}
            <Box pb={1}>
              <Heading size='md' color='gray.500'>
                Tags
              </Heading>
              <ClipTags tags={exp.langtags} color='teal'/>
            </Box>
            {/* clip link */}
            <Stack>
              <Heading size='md' pb={1} color='gray.500'>
                Related Clip
              </Heading>
              <Link to={`/clips/${exp.video.slug}`}>
                <Box position='relative'>
                  <Text
                    color='gray.200'
                    fontWeight='bold'
                    position='absolute'
                    left={1}
                    top={1}
                  >
                    {exp.video.title}
                  </Text>
                  <Image
                    w='100%' aspectRatio={ 30 / 9 }
                    objectFit='cover'
                    src={exp.video.cover}
                    className='img-hover'
                  />
                </Box>
              </Link>
            </Stack>
          </GridItem>
          {/* Right section */}
          <GridItem order={{ base: 1, lg: 2 }}>
            <Center>
              <Box position='relative' maxW='500px'>
                <Image
                  w='100%'
                  objectFit='cover'
                  src={exp.image}
                />
                <ExpressionBookmark expression={exp} />
              </Box>
            </Center>
          </GridItem>
      </SimpleGrid>
      {/* pass `[]` until it's ready, avoid runtime crashes */}
      <ClipExpressionCards data={clipexp?.results ?? []}/>
    </div>
  )
}

export default ExpressionDetailPage