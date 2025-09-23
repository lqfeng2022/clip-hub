import useLanguageStore from '@/languageStore'
import { Box, Button, Collapse, Grid, GridItem, Heading, HStack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ClipAttributes from '../components/clip/ClipAttributes'
import ClipMovie from '../components/clip/ClipMovie'
import useClip from '../hooks/store/useClip'
import ClipExpression from '@/components/ClipExpression'
import useClipExpressions from '@/hooks/store/useClipExpressions'
import BeatLoader from '@/components/BeatLoader'
import { clipPage } from '@/data/clipPage'

const ClipDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: clip, isLoading, error } = useClip(slug!)
  const { data: clipexp } = useClipExpressions(clip?.id)
  
  const lang = useLanguageStore(s => s.language)

  const header = lang === 'ch' && clip?.title_ch
    ? clip?.title_ch : clip?.title
  const about_content = lang === 'ch' && clip?.description_ch 
    ? clip.description_ch : clip?.description

  const clip_page = lang === 'en' ? clipPage.en : clipPage.zh

  const [show, setShow] = useState(true)
  const handleToggle = () => setShow(!show)

  if (isLoading) return <BeatLoader/>
  if (error || !clip) throw error 
  return (
    <Grid
      templateAreas={{ base: `'main'`, lg: `'left right'` }}
      templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
      gap={{base: 0, lg: 5}}
      px={2}
      mb='50px'
    >
      <GridItem order={{ base: 1, lg: 1 }}>
        <ClipMovie video={clip}/>
        <Heading size='md' py={3}>{header}</Heading>
        <Box>
          <HStack mb={1}>
            <Heading size='md' color='gray.500' mr={2}>
              {clip_page.about}
            </Heading>
            {!show && (
              <Button 
                size='xl' 
                p='3px 5px' 
                variant='ghost' 
                onClick={handleToggle}
              >
                ...more
              </Button>
            )}
          </HStack>
          <Box
            px={3}
            borderRadius='12px'
            background='gray.700'
          >
            <Collapse in={show}>
              <Text py={2}>{about_content}</Text>
              <ClipAttributes clip={clip}/>
            </Collapse>
            {show && (
              <Button 
                size='sm' 
                p='3px 5px' 
                my={1} 
                variant='ghost' 
                onClick={handleToggle}
              >
                show lesss
              </Button>
            )}
          </Box>
        </Box>
      </GridItem>
      <GridItem order={{ base: 1, lg: 2 }}>
        <Heading size='md' pb={1} pt={{base: 3, lg: 0}} color='gray'>
          {clip_page.expressions}
        </Heading>
        <ClipExpression data={clipexp?.results ?? []}/>
      </GridItem>
    </Grid>
  )
}

export default ClipDetailPage