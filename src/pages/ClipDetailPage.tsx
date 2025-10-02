import BeatLoader from '@/components/BeatLoader'
import ClipExpression from '@/components/ClipExpression'
import { clipPage } from '@/data/clipPage'
import useClipExpressions from '@/hooks/store/useClipExpressions'
import useLanguageStore from '@/languageStore'
import { Grid, GridItem, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import ClipAttributes from '../components/clip/ClipAttributes'
import ClipMovie from '../components/clip/ClipMovie'
import useClip from '../hooks/store/useClip'

const ClipDetailPage = () => {
  const { slug } = useParams() // get `slug` from url
  const { data: clip, isLoading, error } = useClip(slug!)
  const { data: clipexp } = useClipExpressions(clip?.id)

  const lang = useLanguageStore(s => s.language)
  const header = lang === 'ch' && clip?.title_ch
    ? clip?.title_ch : clip?.title
  const clip_page = lang === 'en' ? clipPage.en : clipPage.zh

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
        <Heading size='md' py={4}>{header}</Heading>
        <ClipAttributes clip={clip}/>
      </GridItem>
      <GridItem order={{ base: 1, lg: 2 }}>
        <Heading size='md' pb={1} pt={{base: 7, lg: 0}} color='gray'>
          {clip_page.expressions}
        </Heading>
        <ClipExpression data={clipexp?.results ?? []}/>
      </GridItem>
    </Grid>
  )
}

export default ClipDetailPage